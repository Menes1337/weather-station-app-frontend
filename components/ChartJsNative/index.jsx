import React, { Component } from 'react'
import Chart from 'chart.js'
import moment from 'moment'
import PropTypes from 'prop-types'
import UserSelect from '../UserSelect'
import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest/index'
import styles from './style'

class ChartJsNative extends React.Component {
  constructor (props) {
    super(props)

    const timeFormat = 'MM/DD/YYYY HH:mm'

    this.state = {

      chart: {
        type: 'line',
        data: {
          labels: [],
          datasets: []
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
                labelString: 'Temperatur'
              }
            }]
          }
        },
      },
      width: '1000',
      height: '1000'
    }

    this._chart = null

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (device, reading) {
    console.log(moment().day(-1).unix())
    const state = (new PipelineRequest('getReadingValues')
      .setInput({device: device.name, reading: reading.name, fromTimestamp: moment().day(-1).unix() * 1000})
      .dispatch()
      .then(result => {
        if (!result.hasOwnProperty('readingValues')) {
          console.error('wrong result format')
          return
        }
        const data = []
        result.readingValues.map((readingValue) => {
          data.push({x: readingValue.timestamp, y: readingValue.value})
        })

        return {
          chart: {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  label: reading.name,
                  fill: false,
                  data: data,
                  pointRadius: 0.2,
                  lineTension: 1,
                  borderWidth: 2,
                  borderColor: 'rgba(94, 143, 247, 0.5)',
                  backgroundColor: 'rgba(94, 143, 247, 0.8)',
                  steppedLine: true
                }
              ]
            },
            options: this.state.chart.options
          }
        }
      }).catch((error) => {
        console.log(error)
        return {}
      }))

    state.then((result) => {
      this.setState(result)
    })
  }

  render () {
    const width = this.state.width
    const height = this.state.height
    const style = {width, height}

    return <div className={styles.chartContainer}>
      <UserSelect ref="userSelect" onSubmit={this.handleSubmit} className={styles.chartUserSelect}/>
      <div className={styles.chartWrapper}>
        <canvas ref="canvas" className={styles.chart}/>
      </div>
    </div>
  }

  componentDidUpdate () {
    if (this._chart) this._chart.destroy()

    const ctx = this.refs.canvas.getContext('2d')
    this._chart = new Chart(ctx, this.state.chart)
  }
}

ChartJsNative
  .propTypes = {
  chartData: PropTypes.object,
  chartOptions: PropTypes.object
}

export default ChartJsNative
