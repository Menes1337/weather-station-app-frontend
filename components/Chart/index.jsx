import React, { Component } from 'react'
import ChartJs from 'chart.js'
import PropTypes from 'prop-types'

class Chart extends Component {
  constructor (props) {
    super(props)

    this.state = null
    this._chart = null
  }

  componentWillReceiveProps (nextProps) {
    const timeFormat = 'MM/DD/YYYY HH:mm'

    this.setState({
      chart: {
        type: 'line',
        data: {
          labels: [],
          datasets: nextProps.dataSets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'linear',
              time: {
                unit: 'hour',
                format: timeFormat,
                // round: 'day'
                tooltipFormat: 'll HH:mm'
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              },
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              gridLines: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: nextProps.yLabel
              }
            }]
          }
        },
      }
    })
  }

  render () {
    return <canvas ref="canvas"/>
  }

  componentDidUpdate () {
    if (this._chart) this._chart.destroy()

    const ctx = this.refs.canvas.getContext('2d')
    this._chart = new ChartJs(ctx, this.state.chart)
  }
}

Chart.propTypes = {
  dataSets: PropTypes.array,
  yLabel: PropTypes.string,
}

Chart.defaultProps = {
  dataSets: [],
  yLabel: ''
}

export default Chart
