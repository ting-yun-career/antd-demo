import { useContext, useEffect, useRef } from 'react'
import { GlobalContext } from '../../global/globalProvider'
import { area, axisBottom, axisLeft, bisector, line, pointer, scaleLinear, select } from 'd3'
import _ from 'lodash'
import { getRandomArbitrary } from '../../utils/number'
import numeral from 'numeral'

const data = _.range(0, 100).map((i) => ({ x: i, y: getRandomArbitrary(50 + 0.2 * i, 55 + 0.2 * i) }))

const Charts = () => {
  const { darkMode, setDarkMode, locale, changeLocale } = useContext(GlobalContext)

  const chartRef = useRef(null)

  useEffect(() => {
    if (data && chartRef.current) {
      const svg = select(chartRef.current)

      // Remove existing before repaint
      if (svg.selectChildren().size() > 0) {
        svg.selectChildren().remove()
      }

      if (select('.tooltip').size() > 0) {
        select('.tooltip').remove()
      }

      // Define chart dimensions and margins
      const height = 500
      const width = height * 1.2

      const margin = { top: 80, right: 40, bottom: 80, left: 80 }
      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      // Set up x and y scales
      const xScale = scaleLinear([0, data[data.length - 1].x], [0, innerWidth])

      const yScale = scaleLinear([0, 100], [innerHeight, 0])

      const areaGenerator = area<{ x: number; y: number }>()
        .x((d) => xScale(d.x))
        .y0(innerHeight)
        .y1((d) => yScale(d.y))

      const lineGenerator = line<{ x: number; y: number }>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))

      svg.classed('root', true).attr('width', width).attr('height', height)

      // svg content
      const contentPane = svg
        .append('g')
        .classed('content-pane', true)
        .attr('style', 'background-color: rgba(50,50,50,0.2)')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .style('border-right', '1px solid white')

      contentPane
        .append('rect')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('fill', darkMode ? 'rgba(50,50,50,0.5)' : 'rgba(200,200,200,0.5)')

      // area path
      contentPane.append('path').attr('fill', 'steelblue').attr('d', areaGenerator(data))

      // line path
      contentPane
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', darkMode ? 'white' : '#222224')
        .attr('stroke-width', 1)
        .attr('d', lineGenerator(data))

      // axis
      const xAxis = axisBottom(xScale)
        .tickPadding(5)
        .tickFormat((d) => `${d}`)

      const yAxis = axisLeft(yScale)

      svg
        .append('g')
        .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
        .call(xAxis)

      svg.append('g').classed('y-axis', true).attr('transform', `translate(${margin.left},${margin.top})`).call(yAxis)
      svg.select('.y-axis .domain').remove()

      select('.svg-container')
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

      svg
        .append('g')
        .classed('title', true)
        .attr('transform', `translate(${width / 2}, ${margin.top - 30})`)
        .append('text')
        .text('Relationship Between X and Y')
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('fill', darkMode ? 'white' : 'black')

      svg
        .append('g')
        .classed('x-axis-label', true)
        .attr('transform', `translate(${width / 2}, ${height - margin.bottom + 40})`)
        .append('text')
        .text('X (unit)')
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

      const bisect = bisector((d: { x: number; y: number }) => d.x).left

      const handleMousemove = (event: any) => {
        // console.log(event)
        const [x] = pointer(event)
        const x0 = xScale.invert(x - margin.left)
        const index = bisect(data, x0)

        const xGuide = select('.x-guide')
        const tooltip = select('.tooltip')

        if (_.isNil(data[index])) {
          xGuide.style('display', 'none')
          tooltip.style('display', 'none')
          return
        }

        xGuide
          .style('display', 'block')
          .attr('transform', `translate(${xScale(data[index]?.x ?? 0) + margin.left}, ${margin.top})`)
          .select('line')
          .attr('y1', yScale(data[index]?.y ?? 0))

        tooltip
          .style('display', 'block')
          .style('top', margin.top + yScale(data[index]?.y ?? 0) - 18 + 'px')
          .style('left', margin.left + xScale(data[index]?.x ?? 0) + 'px')
          .text('y: ' + numeral(data[index].y).format('0,0.00'))
      }

      svg.on('mousemove', handleMousemove)
    }
  }, [darkMode])

  return (
    <>
      <div>Chart</div>
      <div className="svg-container">
        <svg ref={chartRef} />
      </div>
    </>
  )
}

export default Charts
