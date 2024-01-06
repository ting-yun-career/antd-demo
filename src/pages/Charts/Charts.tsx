import { useContext, useEffect, useRef } from 'react'
import { GlobalContext } from '../../global/globalProvider'
import {
  area,
  axisBottom,
  axisLeft,
  bisector,
  line,
  pointer,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  select,
  pie,
  arc,
} from 'd3'
import _ from 'lodash'
import { getRandomArbitrary } from '../../utils/number'
import numeral from 'numeral'
import { Card, Col, Row } from 'antd'
import { useDebounceEffect, useSize, useInterval } from 'ahooks'
import Color from 'color'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { t } from '../../utils/translation'

const areachartData = _.range(0, 100).map((i) => ({ x: i, y: getRandomArbitrary(40 + 0.2 * i, 42 + 0.2 * i) }))
const barchartData = [
  { category: 'A', value: 10 },
  { category: 'B', value: 20 },
  { category: 'C', value: 30 },
  { category: 'D', value: 40 },
  { category: 'E', value: 50 },
]

const ColResponseProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 12,
}

const Charts = () => {
  const { locale, darkMode } = useContext(GlobalContext)

  const areachartRef = useRef(null)
  const areachartContainerRef = useRef<HTMLDivElement>(null)
  const areachartContainerSize = useSize(areachartContainerRef)

  const barchartRef = useRef(null)
  const piechartRef = useRef(null)

  useEffect(() => {
    redraw()
  }, [locale, darkMode])

  useDebounceEffect(
    () => {
      redraw()
    },
    [areachartContainerSize?.width],
    { wait: 100 }
  )

  const redraw = () => {
    if (areachartRef.current) {
      const svg = select(areachartRef.current)

      // Remove existing before repaint
      if (svg.selectChildren().size() > 0) {
        svg.selectChildren().remove()
      }

      if (select('.areachart-container .tooltip').size() > 0) {
        select('.areachart-container .tooltip').remove()
      }

      // Define chart dimensions and margins
      const height = 500
      const width = areachartContainerSize?.width ?? 0

      const margin = { top: 80, right: 40, bottom: 80, left: 80 }
      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      // Set up x and y scales
      const xScale = scaleLinear([0, areachartData[areachartData.length - 1].x], [0, innerWidth])

      const yScale = scaleLinear([0, 100], [innerHeight, 0])

      const areaGenerator = area<{ x: number; y: number }>()
        .x((d) => xScale(d.x))
        .y0(innerHeight)
        .y1((d) => yScale(d.y))

      const lineGenerator = line<{ x: number; y: number }>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))

      const defs = svg.append('defs')

      // gradient
      const gradient = defs
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')

      const stop = gradient.append('stop')

      stop.attr('offset', '0%').style('stop-opacity', 1)
      stop
        .append('animate')
        .attr('attributeName', 'stop-color')
        .attr('values', `#108ee9; #ebd814; #108ee9`)
        .attr('dur', '10s')
        .attr('repeatCount', 'indefinite')

      gradient
        .append('stop')
        .attr('offset', '100%')
        .style('stop-color', darkMode ? '#141414' : '#e4e3e4')
        .style('stop-opacity', 0.8)

      svg.attr('width', width).attr('height', height)

      // content pane
      const contentPane = svg
        .append('g')
        .classed('content-pane', true)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      // content pane background
      contentPane
        .append('rect')
        .classed('content-pane-background', true)
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('fill', darkMode ? 'rgba(50,50,50,0.5)' : 'rgba(200,200,200,0.5)')

      // area path
      contentPane.append('path').attr('fill', 'url(#gradient)').attr('d', areaGenerator(areachartData))

      // line path
      contentPane
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', darkMode ? 'white' : '#222224')
        .attr('stroke-width', 1)
        .attr('d', lineGenerator(areachartData))

      // axis scales
      const xAxis = axisBottom(xScale)
        .tickPadding(5)
        .tickFormat((d) => `${d}`)

      const yAxis = axisLeft(yScale)

      // axis render
      svg
        .append('g')
        .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
        .call(xAxis)

      svg.append('g').classed('y-axis', true).attr('transform', `translate(${margin.left},${margin.top})`).call(yAxis)

      // y-axis custom style
      svg.select('.y-axis .domain').remove()

      // tooltip
      select('.areachart-container')
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

      // title
      svg
        .append('g')
        .classed('title', true)
        .attr('transform', `translate(${width / 2}, ${margin.top - 30})`)
        .append('text')
        .text(t('Relationship Between X and Y', locale))
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('fill', darkMode ? 'white' : 'black')

      // axis labels
      svg
        .append('g')
        .classed('x-axis-label', true)
        .attr('transform', `translate(${width / 2}, ${height - margin.bottom + 40})`)
        .append('text')
        .text(t('X (unit)', locale))
        .style('font-size', '12px')
        .attr('text-anchor', 'middle')
        .style('fill', darkMode ? 'white' : 'black')

      svg
        .append('g')
        .classed('y-axis-label', true)
        .attr('transform', `translate(${margin.left - 40}, ${height / 2})`)
        .append('text')
        .text(t('Y (unit)', locale))
        .style('font-size', '12px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .style('fill', darkMode ? 'white' : 'black')

      // calculate line guide x offset
      const bisect = bisector((d: { x: number; y: number }) => d.x).left

      // node cache
      const tooltip = select('.areachart-container .tooltip')
      const xGuide = select('.areachart-container .x-guide')

      const handleMousemove = (event: any) => {
        const [xRangeValue] = pointer(event)
        const xDomainValue = xScale.invert(xRangeValue - margin.left)

        // bisect selects the index of the data that is closest to the xDomainValue
        const index = bisect(areachartData, xDomainValue)

        if (_.isNil(areachartData[index])) {
          xGuide.style('display', 'none')
          tooltip.style('display', 'none')
          return
        }

        xGuide
          .style('display', 'block')
          .attr('transform', `translate(${xScale(areachartData[index]?.x ?? 0) + margin.left}, ${margin.top})`)
          .select('line')
          .attr('y1', yScale(areachartData[index]?.y ?? 0))

        tooltip
          .style('display', 'block')
          .style('top', margin.top + yScale(areachartData[index]?.y ?? 0) - 18 + 'px')
          .style('left', margin.left + xScale(areachartData[index]?.x ?? 0) + 'px')
          .text('y: ' + numeral(areachartData[index].y).format('0,0.00'))
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

    if (barchartRef.current) {
      const svg = select(barchartRef.current)

      // Remove existing before repaint
      if (svg.selectChildren().size() > 0) {
        svg.selectChildren().remove()
      }

      if (select('.barchart-container .tooltip').size() > 0) {
        select('.barchart-container .tooltip').remove()
      }

      // chart dimensions and margins
      const height = 500
      const width = areachartContainerSize?.width ?? 0

      const margin = { top: 80, right: 40, bottom: 80, left: 80 }
      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      svg.attr('width', width).attr('height', height)

      // scale
      const xScale = scaleBand<string>(
        barchartData.map((d) => d.category),
        [0, innerWidth]
      )
        .paddingInner(0.2)
        .paddingOuter(0.8)

      const yScale = scaleLinear([0, 50], [innerHeight, 0])

      // content pane
      const contentPane = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

      // content pane background
      contentPane
        .append('rect')
        .classed('content-pane-background', true)
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('fill', darkMode ? 'rgba(50,50,50,0.5)' : 'rgba(200,200,200,0.5)')

      const color = scaleOrdinal(['#003049', '#D62828', '#F77F00', '#FCBF49', '#E1D597'])

      const initData = [
        { category: 'A', value: 20 },
        { category: 'B', value: 40 },
        { category: 'C', value: 30 },
        { category: 'D', value: 20 },
        { category: 'E', value: 10 },
      ]

      contentPane
        .selectAll('polygon')
        .data(initData)
        .join((enter) => {
          return enter
            .append('polygon')
            .attr('fill', (d) => color(d.category))
            .attr('stroke', '#6F8190')
            .attr('stroke-width', 0)
            .style('cursor', 'pointer')
            .attr(
              'points',
              (d: any) =>
                `${xScale(d.category)},${innerHeight} ${xScale(d.category)! + xScale.bandwidth()},${innerHeight} ${
                  xScale(d.category)! + xScale.bandwidth()
                },${yScale(d.value)} ${xScale(d.category)!},${yScale(d.value)}`
            )
        })

      // https://observablehq.com/@d3/selection-join
      contentPane
        .selectAll('polygon')
        .data(barchartData)
        .join(
          (enter) => enter,
          (update) => {
            return update.call((update) => {
              update
                .on('mouseenter', (event, d) => {
                  const fillColor = color(d.category)
                  const highlight =
                    Color(fillColor).luminosity() > 0.5
                      ? Color(fillColor).darken(0.5).string()
                      : Color(fillColor).lighten(0.5).string()
                  select(event.currentTarget).attr('fill', highlight).attr('stroke-width', 1)

                  select('.barchart-container .tooltip')
                    .style('top', margin.top + yScale(d.value) - 22 + 'px')
                    .style('left', margin.left + xScale(d.category!)! - 1 + 'px')
                    .style('width', xScale.bandwidth() + 2 + 'px')
                    .text('value: ' + d.value)
                    .style('display', 'flex')
                })
                .on('mouseleave', (event, d) => {
                  select(event.currentTarget)
                    .attr('fill', color(d.category))
                    .attr('stroke-width', 0)
                    .attr('stroke-dasharray', '0, 0')

                  select('.barchart-container .tooltip').style('display', 'none')
                })

              return update
                .transition()
                .delay((d, i) => (i + 1) * 300)
                .duration((d, i) => (i + 1) * 1000)
                .attr(
                  'points',
                  (d: any) =>
                    `${xScale(d.category)},${innerHeight} ${xScale(d.category)! + xScale.bandwidth()},${innerHeight} ${
                      xScale(d.category)! + xScale.bandwidth()
                    },${yScale(d.value)} ${xScale(d.category)!},${yScale(d.value)}`
                )
            })
          }
        )

      // axes
      const xAxis = axisBottom(xScale)
      const yAxis = axisLeft(yScale)

      svg
        .append('g')
        .classed('x-axis', true)
        .attr('transform', `translate(${margin.left}, ${innerHeight + margin.top})`)
        .call(xAxis)

      svg.append('g').classed('y-axis', true).attr('transform', `translate(${margin.left}, ${margin.top})`).call(yAxis)

      // title
      svg
        .append('g')
        .classed('title', true)
        .attr('transform', `translate(${width / 2}, ${margin.top - 30})`)
        .append('text')
        .text(t('Y by Category', locale))
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('fill', darkMode ? 'white' : 'black')

      // axis labels
      svg
        .append('g')
        .classed('x-axis-label', true)
        .attr('transform', `translate(${width / 2}, ${height - margin.bottom + 40})`)
        .append('text')
        .text(t('X (category)', locale))
        .style('font-size', '12px')
        .attr('text-anchor', 'middle')
        .style('fill', darkMode ? 'white' : 'black')

      svg
        .append('g')
        .classed('y-axis-label', true)
        .attr('transform', `translate(${margin.left - 40}, ${height / 2})`)
        .append('text')
        .text(t('Y (unit)', locale))
        .style('font-size', '12px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .style('fill', darkMode ? 'white' : 'black')

      // tooltip
      select('.barchart-container')
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
    }

    if (piechartRef.current) {
      const svg = select(piechartRef.current)

      // Remove existing before repaint
      if (svg.selectChildren().size() > 0) {
        svg.selectChildren().remove()
      }

      // chart dimensions and margins
      const height = 500
      const width = areachartContainerSize?.width ?? 0

      const data = [
        { category: 'A', data: 30 },
        { category: 'B', data: 45 },
        { category: 'C', data: 9 },
        { category: 'D', data: 67 },
        { category: 'E', data: 22 },
      ]

      // svg init
      svg.attr('width', width).attr('height', height)

      // slices
      const radius = 150
      const color = scaleOrdinal(['#003049', '#D62828', '#F77F00', '#FCBF49', '#E1D597'])
      const sliceContainer = svg.append('g').attr('class', 'slice-container')

      const pieFn = pie<{ category: string; data: number }>()
        .value((d) => d.data)
        .sort(null)
      const arcFn = arc<any>()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.8)

      const pieData = pieFn(data)

      sliceContainer
        .selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arcFn)
        .attr('fill', (d) => color(d.data.category))
        .attr('stroke', '#999')
        .attr('stroke-width', 0)
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        .on('mouseenter', (event, d) => {
          const fillColor = color(d.data.category)
          const highlight =
            Color(fillColor).luminosity() > 0.5
              ? Color(fillColor).darken(0.5).string()
              : Color(fillColor).lighten(0.5).string()

          select(event.currentTarget).attr('fill', highlight).attr('stroke-width', 1)
        })
        .on('mouseleave', (event, d) => {
          select(event.currentTarget).attr('fill', color(d.data.category)).attr('stroke-width', 0)
        })

      // lines
      const outerArc = arc<any>().outerRadius(radius).innerRadius(radius)

      const borderArc = arc<any>()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.8)

      const midAngle = (d: any) => d.startAngle + (d.endAngle - d.startAngle) / 2

      svg
        .append('g')
        .classed('lines', true)
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        .selectAll('polyline')
        .data(pieData)
        .enter()
        .append('polyline')
        .style('fill', 'none')
        .style('stroke', darkMode ? '#aaa' : 'black')
        .style('stroke-width', '1px')
        .style('opacity', 0.5)
        .attr('points', (d) => {
          const pos = outerArc.centroid(d)
          pos[0] = radius * 1.5 * (midAngle(d) < Math.PI ? 1 : -1)
          return [...borderArc.centroid(d), ...outerArc.centroid(d), pos].join(',')
        })

      // labels
      svg
        .append('g')
        .classed('labels', true)
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        .selectAll('text')
        .data(pieData)
        .enter()
        .append('text')
        .style('fill', darkMode ? 'white' : 'black')
        .text((d) => `${d.data.category}(${d.data.data}%)`)
        .attr('transform', function (d) {
          const pos = outerArc.centroid(d)
          pos[0] = radius * 1.5 * (midAngle(d) < Math.PI ? 1 : -1) * 1.05
          pos[1] = pos[1] + 5
          return 'translate(' + pos + ')'
        })
        .style('text-anchor', function (d) {
          return midAngle(d) < Math.PI ? 'start' : 'end'
        })

      const offset = locale === 'zh_CN' ? 28 : 48
      // center label
      svg
        .append('g')
        .classed('center', true)
        .attr('transform', 'translate(' + (width / 2 - offset) + ',' + (height / 2 + 5) + ')')
        .append('text')
        .text(t('% By Category', locale))
        .style('fill', darkMode ? 'white' : 'black')
    }
  }

  return (
    <>
      <PageTitle>{t('Charts', locale)}</PageTitle>
      <Row gutter={10} justify={'start'}>
        <Col {...ColResponseProps} style={{ marginBottom: '10px' }}>
          <Card title={t('Area Chart', locale)} style={{ maxWidth: '1000px', overflow: 'hidden' }}>
            <div className="areachart-container" ref={areachartContainerRef}>
              <svg ref={areachartRef} />
            </div>
          </Card>
        </Col>
        <Col {...ColResponseProps} style={{ marginBottom: '10px' }}>
          <Card title={t('Bar Chart', locale)} style={{ maxWidth: '1000px', overflow: 'hidden' }}>
            <div className="barchart-container">
              <svg ref={barchartRef} />
            </div>
          </Card>
        </Col>
        <Col span="24" style={{ marginBottom: '10px' }}>
          <Card title={t('Pie Chart', locale)} style={{ overflow: 'hidden' }}>
            <div className="piechart-container" style={{ display: 'flex', justifyContent: 'center' }}>
              <svg ref={piechartRef} />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Charts
