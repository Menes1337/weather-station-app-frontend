import React, { Component } from 'react'
import styles from './style'
import Chart from '../Chart'
import moment from 'moment'
import ReadingSelect from '../ReadingSelect'
import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest/index'

const colors = [
  '94, 143, 247',
  '191, 0, 255',
  '255, 0, 0',
  '0, 255, 0',
  '255, 187, 0',
  '0, 0, 0'
]

class FHEMData extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectReadings: [],
      dataSets: []
    }

    this.onChange = this.onChange.bind(this)
  }

  /**
   * @param {array} selectedReadingValues
   * @returns {Promise<void>}
   */
  async onChange (selectedReadingValues) {
    const readingValuesPromises = []
    for (const selectedReadingValue of selectedReadingValues) {
      readingValuesPromises.push(
        new PipelineRequest('getReadingValues')
          .setInput({
            device: selectedReadingValue.device,
            reading: selectedReadingValue.reading,
            fromTimestamp: moment().subtract(3, 'days').unix() * 1000
          })
          .dispatch()
      )
    }

    const readingValuesPerDevice = await Promise.all(readingValuesPromises)

    const dataSets = []
    for (let i = 0; i < readingValuesPerDevice.length; ++i) {
      if (!readingValuesPerDevice[i].hasOwnProperty('readingValues')) {
        console.error('wrong result format')
        return
      }

      dataSets.push(this.prepareDataSet(
        selectedReadingValues[i].device,
        selectedReadingValues[i].reading,
        readingValuesPerDevice[i].readingValues,
        colors[i % colors.length]
      ))
    }

    this.setState({
      dataSets: dataSets
    })
  }

  prepareDataSet (device, reading, readingValues, color) {
    return {
      label: device + '.' + reading,
      fill: false,
      data: readingValues.map((readingValue) => {
        return {x: readingValue.timestamp, y: readingValue.value}
      }),
      pointRadius: 0.2,
      lineTension: 1,
      borderWidth: 2,
      borderColor: 'rgba(' + color + ', 0.75)',
      backgroundColor: 'rgba(' + color + ', 1)',
      steppedLine: true
    }
  }

  async componentDidMount () {
    let devicesApi
    try {
      const pipelineRequest = new PipelineRequest('getDevices').setInput({})
      devicesApi = await pipelineRequest.dispatch()
    } catch (error) {
      console.log(error)
    }

    if (!devicesApi || !devicesApi.hasOwnProperty('devices')) {
      console.error('wrong result format')
      return
    }

    this.setState({
      selectReadings: this.convertDevicesToSelectData(devicesApi.devices)
    })
  }

  convertDevicesToSelectData (devices) {
    const readings = []
    devices.map(device => {
      device.readings.map(reading => {
        readings.push({
          label: device.name + '.' + reading.name,
          value: device.name + '.' + reading.name,
          device: device.name,
          reading: reading.name
        })
      })
    })

    return readings
  }

  render () {
    return <div className={styles.viewport}>
      <ReadingSelect options={this.state.selectReadings} onChange={this.onChange}
                     className={styles.readingSelectContainer}/>
      <div className={styles.chartContainer}>
        <Chart className={styles.chart} dataSets={this.state.dataSets} yLabel={''}/>
      </div>
    </div>
  }
}

export default FHEMData
