import { CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Col, Row, Space, Tooltip } from 'antd'
import ChartCard from '../../components/ChartCard/ChartCard'
import { yuan } from '../../utils/number'
import ChartField from '../../components/Field/ChartField'
import { GlobalContext } from '../../global/globalProvider'
import { useContext, useEffect, useRef } from 'react'
import { green, red } from '@ant-design/colors'
import { useDebounceEffect, useSize } from 'ahooks'
import { area, bisector, pointer, scaleLinear, select } from 'd3'
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
    redraw()
  }, [darkMode])

  useDebounceEffect(
    () => {
      redraw()
    },
    [visitorChartContainerSize?.width],
    { wait: 100 }
  )

  const redraw = () => {
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
      const innerWidth = width - margin.left - margin.right
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
          .attr('transform', `translate(${xScale(visitorData[index]?.year ?? 0) + margin.left}, ${margin.top})`)
          .select('line')
          .attr('y1', yScale(visitorData[index]?.value ?? 0))

        tooltip
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

  return (
    <div className="antd-demo-dashboard">
      <Row gutter={10} justify={'start'}>
        <Col {...ColResponseProps}>
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
              footer={<ChartField label={locale === 'zh_CN' ? '今日' : 'Today'} value={yuan(12423)} />}
            >
              <div style={{ height: '100px' }}>
                <div className={styles['dashboard-total']}>{yuan(126560)}</div>
                <ChartField
                  label={locale === 'zh_CN' ? '周销售' : 'Weekly'}
                  value={'12%'}
                  postIcon={<CaretUpOutlined style={{ color: green[5] }} />}
                />
                <ChartField
                  style={{ marginLeft: '10px', ...style2 }}
                  label={locale === 'zh_CN' ? '日销售' : 'Daily'}
                  value={'12%'}
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
            // total={'8,840'}
            footer={
              <ChartField
                label={locale === 'zh_CN' ? '今日客流量' : 'Visitors Today'}
                value={numeral(12423).format('0,0')}
              />
            }
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
      </Row>
    </div>
  )
}

export default Dashboard
