import { CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Col, Row, Space, Tooltip } from 'antd'
import ChartCard from '../../components/ChartCard/ChartCard'
import ChartField from '../../components/Field/ChartField'
import { GlobalContext } from '../../global/globalProvider'
import { useContext, useEffect, useRef } from 'react'
import { green, red } from '@ant-design/colors'
import { useDebounceEffect, useSize } from 'ahooks'
import { area, bisector, pointer, scaleBand, scaleLinear, select } from 'd3'
import numeral from 'numeral'
import _ from 'lodash'
import styles from './Dashboard.module.scss'

const ColResponseProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
}

const visitorData = [
  {
    year: 1991,
    value: 15468,
  },
  {
    year: 1992,
    value: 16100,
  },
  {
    year: 1993,
    value: 15900,
  },
  {
    year: 1994,
    value: 17409,
  },
  {
    year: 1995,
    value: 17000,
  },
  {
    year: 1996,
    value: 31056,
  },
  {
    year: 1997,
    value: 31982,
  },
  {
    year: 1998,
    value: 32040,
  },
  {
    year: 1999,
    value: 33233,
  },
  {
    year: 2000,
    value: 35038,
  },
  {
    year: 2001,
    value: 33423,
  },
]

const Dashboard: React.FC = () => {
  const { darkMode, locale } = useContext(GlobalContext)
  const ref = useRef<HTMLDivElement>(null)

  const size = useSize(ref)

  const style2 =
    size && size.width < 282
      ? {
          width: '100%',
          marginLeft: 0,
        }
      : {}

  // visitor chart
  const visitorContainerRef = useRef<HTMLDivElement>(null)
  const visitorChartRef = useRef(null)
  const visitorChartContainerSize = useSize(visitorContainerRef)

  useEffect(() => {
    redrawVisitorChart()
  }, [darkMode])

  useDebounceEffect(
    () => {
      redrawVisitorChart()
    },
    [visitorChartContainerSize?.width],
    { wait: 100 }
  )

  const redrawVisitorChart = () => {
    if (visitorChartRef.current) {
      const svg = select(visitorChartRef.current)

      // Remove existing before repaint
      if (svg.selectChildren().size() > 0) {
        svg.selectChildren().remove()
      }

      if (select('.visitor-areachart-container .tooltip').size() > 0) {
        select('.visitor-areachart-container .tooltip').remove()
      }

      // dimensions and margins
      const height = 90
      const width = visitorChartContainerSize?.width ?? 0

      const margin = { top: 5, right: 5, bottom: 5, left: 5 }
      const innerWidth = Math.max(width - margin.left - margin.right, 0)
      const innerHeight = height - margin.top - margin.bottom

      const yMax = Math.max(...visitorData.map((d) => d.value))

      // scales
      const xScale = scaleLinear([visitorData[0].year, visitorData[visitorData.length - 1].year], [0, innerWidth])
      const yScale = scaleLinear([0, yMax * 1.5], [innerHeight, 0])

      // area generator
      const areaGenerator = area<{ year: number; value: number }>()
        .x((d) => xScale(d.year))
        .y0(innerHeight)
        .y1((d) => yScale(d.value))

      // svg init
      svg.attr('width', width).attr('height', height)

      // content pane
      const contentPane = svg
        .append('g')
        .classed('content-pane', true)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      // content pane background
      contentPane.append('rect').attr('width', innerWidth).attr('height', innerHeight).style('fill', 'none')

      // area path
      contentPane.append('path').attr('fill', 'steelblue').attr('d', areaGenerator(visitorData))

      select('.visitor-areachart-container')
        .style('position', 'relative')
        .append('div')
        .classed('tooltip', true)
        .style('position', 'absolute')
        .style('top', 0)
        .style('left', 0)
        .style('background-color', 'white')
        .style('border', '1px solid black')
        .style('padding', '2px 3px')
        .style('border-radius', '3px')
        .style('color', 'black')
        .style('font-size', '11px')
        .style('white-space', 'nowrap')
        .style('display', 'none')

      // x guide line
      svg
        .append('g')
        .classed('x-guide', true)
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .style('display', 'none')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', innerHeight)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,2')

      // calculate line guide x offset
      const bisect = bisector((d: { year: number; value: number }) => d.year).left

      // node cache
      const tooltip = select('.visitor-areachart-container .tooltip')
      const xGuide = select('.visitor-areachart-container .x-guide')

      const handleMousemove = (event: any) => {
        const [xRangeValue] = pointer(event)
        const xDomainValue = xScale.invert(xRangeValue - margin.left)

        const index = bisect(visitorData, xDomainValue)

        if (_.isNil(visitorData[index])) {
          xGuide.style('display', 'none')
          tooltip.style('display', 'none')
          return
        }

        xGuide
          .style('display', 'block')
          .attr('transform', `translate(${xScale(visitorData[index]?.year ?? 0) + margin.left}, ${margin.top})`)
          .select('line')
          .attr('y1', yScale(visitorData[index]?.value ?? 0))

        tooltip
          .style('display', 'block')
          .style('top', margin.top + yScale(visitorData[index]?.value ?? 0) - 18 + 'px')
          .style('left', margin.left + xScale(visitorData[index]?.year ?? 0) - 30 + 'px')
          .text('visitor: ' + numeral(visitorData[index].value).format('0 a'))
      }

      svg.on('mousemove', handleMousemove)

      svg.on('mouseenter', () => {
        xGuide.style('display', 'block')
        tooltip.style('display', 'block')
      })

      svg.on('mouseleave', () => {
        xGuide.style('display', 'none')
        tooltip.style('display', 'none')
      })
    }
  }

  const expanseContainerRef = useRef<HTMLDivElement>(null)
  const expanseChartRef = useRef(null)
  const expanseChartContainerSize = useSize(expanseContainerRef)

  useDebounceEffect(
    () => {
      redrawExpanseChart()
    },
    [expanseChartContainerSize?.width],
    { wait: 100 }
  )

  const redrawExpanseChart = () => {
    if (expanseChartRef.current) {
      const svg = select(expanseChartRef.current)

      if (svg.selectChildren().size() > 0) {
        svg.selectChildren().remove()
      }

      if (select('.expanse-barchart-container .tooltip').size() > 0) {
        select('.expanse-barchart-container .tooltip').remove()
      }

      // dimensions and margins
      const height = 90
      const width = visitorChartContainerSize?.width ?? 0

      const margin = { top: 5, right: 5, bottom: 5, left: 5 }
      const innerWidth = Math.max(width - margin.left - margin.right, 0)
      const innerHeight = height - margin.top - margin.bottom

      const data = [
        { category: 'asset', value: 93244 },
        { category: 'operation', value: 73244 },
        { category: 'administration', value: 10244 },
        { category: 'ad', value: 87244 },
        { category: 'other', value: 35953 },
      ]

      // scale
      const xScale = scaleBand<string>(
        data.map((d) => d.category),
        [0, innerWidth]
      )
        .paddingInner(0.2)
        .paddingOuter(width > 300 ? 1.5 : 0.2)

      const yScale = scaleLinear([0, 150000], [innerHeight, 0])

      // svg init
      svg.attr('width', width).attr('height', height)

      // content pane
      const contentPane = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

      // content pane background
      contentPane
        .append('rect')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('fill', darkMode ? 'rgba(50,50,50,0.5)' : 'rgba(200,200,200,0.5)')

      // tooltip
      select('.expanse-barchart-container')
        .style('position', 'relative')
        .append('div')
        .classed('tooltip', true)
        .style('position', 'absolute')
        .style('top', 0)
        .style('left', 0)
        .style('background-color', 'white')
        .style('border', '1px solid black')
        .style('border-radius', '3px')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('min-height', '20px')
        .style('color', 'black')
        .style('font-size', '11px')
        .style('display', 'none')

      // bars
      contentPane
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d) => xScale(d.category) ?? 0)
        .attr('y', (d) => yScale(d.value) ?? 0)
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => innerHeight - (yScale(d.value) ?? 0))
        .attr('fill', 'steelblue')
        .attr('stroke', '#6F8190')
        .attr('stroke-width', 0)
        .style('cursor', 'pointer')
        .on('mouseenter', (event, d) => {
          select(event.currentTarget).style('fill', '#6B9BC3').attr('stroke-width', 1)

          select('.expanse-barchart-container .tooltip')
            .style('top', margin.top + yScale(d.value) - 12 + 'px')
            .style('left', margin.left + xScale(d.category!)! - 1 + 'px')
            .style('width', xScale.bandwidth() + 2 + 'px')
            .text('$' + numeral(d.value).format('0 a'))
            .style('display', 'flex')
        })
        .on('mouseleave', (event, d) => {
          select(event.currentTarget)
            .style('fill', 'steelblue')
            .attr('stroke-width', 0)
            .attr('stroke-dasharray', '0, 0')

          select('.expanse-barchart-container .tooltip').style('display', 'none')
        })
    }
  }

  return (
    <div className="antd-demo-dashboard">
      <Row gutter={10} justify={'start'}>
        <Col {...ColResponseProps} style={{ marginBottom: '10px' }}>
          <div ref={ref}>
            <ChartCard
              bordered={true}
              title={
                <Space>
                  <span>{locale === 'zh_CN' ? '销售额' : 'Sales Volumes'}</span>
                  <Tooltip title={locale === 'zh_CN' ? '從 2023/01/01' : 'Since 2023/01/01'}>
                    <InfoCircleOutlined />
                  </Tooltip>
                </Space>
              }
              loading={false}
              footer={
                <ChartField label={locale === 'zh_CN' ? '今日' : 'Today'} value={'$' + numeral(12423).format('0,0')} />
              }
            >
              <div style={{ height: '100px' }}>
                <div className={styles['dashboard-total']}>{'$' + numeral(126560).format('0,0')}</div>
                <ChartField
                  label={locale === 'zh_CN' ? '周销售' : 'Weekly'}
                  value={'5%'}
                  postIcon={<CaretUpOutlined style={{ color: green[5] }} />}
                />
                <ChartField
                  style={{ marginLeft: '10px', ...style2 }}
                  label={locale === 'zh_CN' ? '日销售' : 'Daily'}
                  value={'2%'}
                  postIcon={<CaretDownOutlined style={{ color: red[5] }} />}
                />
              </div>
            </ChartCard>
          </div>
        </Col>
        <Col {...ColResponseProps}>
          <ChartCard
            bordered={true}
            title={
              <Space>
                <span>{locale === 'zh_CN' ? '访问量' : 'Visitors'}</span>
                <Tooltip title={locale === 'zh_CN' ? '從 2023/01/01' : 'Since 2023/01/01'}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Space>
            }
            footer={<ChartField label={locale === 'zh_CN' ? '今日' : 'Today'} value={numeral(33423).format('0,0')} />}
          >
            <div
              className="visitor-areachart-container"
              ref={visitorContainerRef}
              style={{ height: '100px', display: 'flex', alignItems: 'end' }}
            >
              <svg ref={visitorChartRef} />
            </div>
          </ChartCard>
        </Col>
        <Col {...ColResponseProps}>
          <ChartCard
            bordered={true}
            title={
              <Space>
                <span>{locale === 'zh_CN' ? '支出' : 'Expense'}</span>
                <Tooltip title={locale === 'zh_CN' ? '從 2023/01/01' : 'Since 2023/01/01'}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Space>
            }
            footer={
              <ChartField label={locale === 'zh_CN' ? '總支出' : 'Net'} value={'$' + numeral(299929).format('0,0')} />
            }
          >
            <div
              className="expanse-barchart-container"
              ref={expanseContainerRef}
              style={{ height: '100px', display: 'flex', alignItems: 'end' }}
            >
              <svg height="90" ref={expanseChartRef}></svg>
            </div>
          </ChartCard>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
