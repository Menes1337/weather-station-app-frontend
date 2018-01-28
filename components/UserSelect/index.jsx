import React, { Component } from 'react'
import styles from './style'
import getDevices from '../../pipeline_requests/getDevices'
import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class UserSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      device: {
        selectedDevice: {name: '', values: []},
        values: []
      },
      reading: {
        selectedReading: {name: '', unit: ''},
        values: []
      }
    }
    this.lastOnSubmit = {device: null, reading: null}

    this.handleDeviceChange = this.handleDeviceChange.bind(this)
    this.handleReadingChange = this.handleReadingChange.bind(this)
  }

  handleDeviceChange (event) {
    const selectedDevice = this.selectDevices(event.value)
    const readings = selectedDevice.readings ? selectedDevice.readings : []
    this.setState({
      device: {
        selectedDevice: selectedDevice,
        values: this.state.device.values
      },
      reading: {
        selectedReading: this.selectReadings(readings, this.state.reading.selectedReading.name),
        values: readings
      }
    })

    this.onSubmit()
  }

  selectDevices (deviceName) {
    const filteredDevices = this.state.device.values.filter((device) => {
      return device.name === deviceName
    })

    if (filteredDevices.length > 0) {
      return filteredDevices[0]
    }

    return {name: '', values: []}
  }

  handleReadingChange (event) {
    this.setState({
      reading: {
        selectedReading: this.selectReadings(this.state.reading.values, event.value),
        values: this.state.reading.values
      }
    })
    this.onSubmit()
  }

  selectReadings (readings, readingName) {
    const filteredReadings = readings.filter((reading) => {
      return reading.name === readingName
    })

    if (filteredReadings.length > 0) {
      return filteredReadings[0]
    }

    return {name: '', unit: ''}
  }

  componentDidUpdate () {
    this.onSubmit()
  }

  componentDidMount () {
    new PipelineRequest('getDevices')
      .setInput({})
      .dispatch()
      .then(result => {
        console.log('devices: ' + result.devices)
        if (!result.hasOwnProperty('devices')) {
          console.error('wrong result format')
          return
        }
        this.setState({
          device: {
            selectedDevice: {name: '', values: []},
            values: result.devices
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onSubmit () {
    if (!this.state.device.selectedDevice.name || !this.state.reading.selectedReading.name) {
      return
    }

    if (
      this.lastOnSubmit.deviceName === this.state.device.selectedDevice.name
      && this.lastOnSubmit.readingName === this.state.reading.selectedReading.name
    ) {
      return
    }

    console.log('SUBMIT')
    this.lastOnSubmit = {
      deviceName: this.state.device.selectedDevice.name,
      readingName: this.state.reading.selectedReading.name
    }
    this.props.onSubmit(this.state.device.selectedDevice, this.state.reading.selectedReading)
  }

  render () {
    return (
      <div className={styles.userInterface}>
        <Select id="devices" ref="devices" name="devices" value={this.state.device.selectedDevice.name}
                onChange={this.handleDeviceChange} onSelectResetsInput={false} onBlurResetsInput={false}
                options={this.renderDeviceOptions()} searchable={false}
                className={styles.selectDevices}/>
        <Select id="readings" ref="readings" name="readings" value={this.state.reading.selectedReading.name}
                onChange={this.handleReadingChange} onSelectResetsInput={false} onBlurResetsInput={false}
                options={this.renderReadingOptions()} searchable={false}
                className={styles.selectReadings}/>
      </div>
    )
  }

  renderDeviceOptions () {
    if (this.state.device.values.length === 0) {
      console.log([this.addDefault()])
      return [this.addDefault()]
    }

    const options = this.state.device.values.map((device, i) => {
      return {label: device.name, value: device.name}
    })
    options.push(this.addDefault())
    console.log(options)
    return options
  }

  renderReadingOptions () {
    if (this.state.reading.values.length === 0) {
      console.log([this.addDefault()])
      return [this.addDefault()]
    }

    const options = this.state.reading.values.map((reading, i) => {
      return {value: reading.name, label: reading.name}
    })
    options.push(this.addDefault())
    console.log(options)
    return options
  }

  addDefault () {
    return {
      label: '',
      value: ''
    }
  }
}

export default UserSelect
