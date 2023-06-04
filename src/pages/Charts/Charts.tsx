import { useContext, useEffect, useRef } from 'react'
import { GlobalContext } from '../../global/globalProvider'
import { area, axisBottom, axisLeft, bisector, line, pointer, scaleBand, scaleLinear, select } from 'd3'
import _ from 'lodash'
import { getRandomArbitrary } from '../../utils/number'
import numeral from 'numeral'

const areachartData = _.range(0, 100).map((i) => ({ x: i, y: getRandomArbitrary(50 + 0.2 * i, 55 + 0.2 * i) }))
const barchartData = [
  { category: 'A', value: 20 },
  { category: 'B', value: 30 },
  { category: 'C', value: 15 },
  { category: 'A', value: 26 },
  { category: 'D', value: 25 },
  { category: 'E', value: 45 },
]

const Charts = () => {
  const { darkMode, setDarkMode, locale, changeLocale } = useContext(GlobalContext)

  const areachartRef = useRef(null)
  const barchartRef = useRef(null)

  useEffect(() => {
    if (areachartRef.current) {
      const areachartSvg = select(areachartRef.current)

      // Remove existing before repaint
      if (areachartSvg.selectChildren().size() > 0) {
        areachartSvg.selectChildren().remove()
      }

      if (select('.areachart-container .tooltip').size() > 0) {
        select('.areachart-container .tooltip').remove()
      }

      // Define chart dimensions and margins
      const height = 500
      const width = height * 1.2

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

      areachartSvg.classed('root', true).attr('width', width).attr('height', height)

      // content pane
      const contentPane = areachartSvg
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
      contentPane.append('path').attr('fill', 'steelblue').attr('d', areaGenerator(areachartData))

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
      areachartSvg
        .append('g')
        .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
        .call(xAxis)

      areachartSvg
        .append('g')
        .classed('y-axis', true)
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(yAxis)

      // y-axis custom style
      areachartSvg.select('.y-axis .domain').remove()

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
      areachartSvg
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
      areachartSvg
        .append('g')
        .classed('title', true)
        .attr('transform', `translate(${width / 2}, ${margin.top - 30})`)
        .append('text')
        .text('Relationship Between X and Y')
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('fill', darkMode ? 'white' : 'black')

      // axis labels
      areachartSvg
        .append('g')
        .classed('x-axis-label', true)
        .attr('transform', `translate(${width / 2}, ${height - margin.bottom + 40})`)
        .append('text')
        .text('X (unit)')
        .style('font-size', '12px')
        .attr('text-anchor', 'middle')
        .style('fill', darkMode ? 'white' : 'black')

      areachartSvg
        .append('g')
        .classed('y-axis-label', true)
        .attr('transform', `translate(${margin.left - 40}, ${height / 2})`)
        .append('text')
        .text('Y (unit)')
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

      areachartSvg.on('mousemove', handleMousemove)

      areachartSvg.on('mouseenter', () => {
        xGuide.style('display', 'block')
        tooltip.style('display', 'block')
      })

      areachartSvg.on('mouseleave', () => {
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
      const width = height * 1.2

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

      // bars
      contentPane
        .selectAll('rect')
        .data(barchartData)
        .enter()
        .append('rect')
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

          select('.barchart-container .tooltip')
            .style('top', margin.top + yScale(d.value) - 22 + 'px')
            .style('left', margin.left + xScale(d.category!)! - 1 + 'px')
            .style('width', xScale.bandwidth() + 2 + 'px')
            .text('value: ' + d.value)
            .style('display', 'flex')
        })
        .on('mouseleave', (event, d) => {
          select(event.currentTarget)
            .style('fill', 'steelblue')
            .attr('stroke-width', 0)
            .attr('stroke-dasharray', '0, 0')

          select('.barchart-container .tooltip').style('display', 'none')
        })

      // axes
      const xAxis = axisBottom(xScale)
      const yAxis = axisLeft(yScale)

      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${innerHeight + margin.top})`)
        .call(xAxis)

      svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`).call(yAxis)

      // title
      svg
        .append('g')
        .classed('title', true)
        .attr('transform', `translate(${width / 2}, ${margin.top - 30})`)
        .append('text')
        .text('Y by Category')
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('fill', darkMode ? 'white' : 'black')

      // axis labels
      svg
        .append('g')
        .classed('x-axis-label', true)
        .attr('transform', `translate(${width / 2}, ${height - margin.bottom + 40})`)
        .append('text')
        .text('X (category)')
        .style('font-size', '12px')
        .attr('text-anchor', 'middle')
        .style('fill', darkMode ? 'white' : 'black')

      svg
        .append('g')
        .classed('y-axis-label', true)
        .attr('transform', `translate(${margin.left - 40}, ${height / 2})`)
        .append('text')
        .text('Y (unit)')
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
  }, [darkMode])

  return (
    <>
      <div>Chart</div>
      <div className="areachart-container">
        <svg ref={areachartRef} />
      </div>
      <div className="barchart-container">
        <svg ref={barchartRef} />
      </div>
    </>
  )
}

export default Charts
