function getPixelForXValue (x, xScale) {
  return x * (xScale.width / xScale.ticks.length) + xScale.left
}

Chart.pluginService.register({
  afterDraw: function (chartInstance) {
    var xValue
    var yValue
    var xScale = chartInstance.scales['x-axis-0']
    var yScale = chartInstance.scales['y-axis-0']
    var canvas = chartInstance.chart
    var ctx = canvas.ctx
    var index
    var line
    var style

    if (chartInstance.options.horizontalLine) {
      for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
        line = chartInstance.options.horizontalLine[index]

        if (line != null) {
          if (!line.style) {
            style = 'rgba(169,169,169, .6)'
          } else {
            style = line.style
          }
          xValue = line.x != null ? getPixelForXValue(line.x, xScale) : getPixelForXValue(0, xScale)
          yValue = line.y != null ? yScale.getPixelForValue(line.y) : yScale.getPixelForValue(0)

          ctx.lineWidth = 3

          if (xValue != null && yValue != null) {
            ctx.beginPath()
            ctx.moveTo(xValue, yValue)
            ctx.lineTo(canvas.width - 15, yValue) // Another offset to fit the line with the canvas
            ctx.strokeStyle = style
            ctx.stroke()
          }

          if (line.text) {
            ctx.fillStyle = style
            ctx.fillText(line.text, 0, yValue + ctx.lineWidth)
          }
        }
      }
    }
  }
})

Chart.pluginService.register({
  afterDraw: function (chartInstance) {
    var xValue
    var yValue
    var xScale = chartInstance.scales['x-axis-0']
    var yScale = chartInstance.scales['y-axis-0']
    var canvas = chartInstance.chart
    var ctx = canvas.ctx
    var index
    var line
    var style

    if (chartInstance.options.verticalLine) {
      for (index = 0; index < chartInstance.options.verticalLine.length; index++) {
        line = chartInstance.options.verticalLine[index]

        if (line != null) {
          if (!line.style) {
            style = 'rgba(169,169,169, .6)'
          } else {
            style = line.style
          }

          xValue = line.x != null ? getPixelForXValue(line.x, xScale) : getPixelForXValue(0, xScale)
          yValue = line.y != null ? yScale.getPixelForValue(line.y) : yScale.getPixelForValue(yScale.end)

          ctx.lineWidth = 3

          if (xValue != null && yValue != null) {
            ctx.beginPath()
            ctx.moveTo(xValue, yValue)
            ctx.lineTo(xValue, canvas.height - 37)
            ctx.strokeStyle = style
            ctx.stroke()
          }

          if (line.text) {
            ctx.fillStyle = style
            ctx.fillText(line.text, xValue + ctx.lineWidth, 0)
          }
        }
      }
    }
  }
})
