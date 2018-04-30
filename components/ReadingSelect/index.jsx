import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import PropTypes from 'prop-types'

class ReadingSelect extends Component {
  constructor (props) {
    super(props)

    this.state = {
      values: []
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (values) {
    this.setState({values})

    this.props.onChange(values)
  }

  render () {
    const {values} = this.state

    return (
      <Select id="readings" ref="readings" name="readings" value={values}
              onChange={this.onChange} onSelectResetsInput={false} onBlurResetsInput={false}
              options={this.props.options} searchable={false} removeSelected={true} closeOnSelect={false}
              multi/>
    )
  }
}

ReadingSelect.defaultProps = {
  onChange: (value) => null,
  options: [
    {label: 'Bath.temperature', value: 'Bath.temperature'},
    {label: 'Outside.temperature', value: 'Outside.temperature'}
  ]
}

ReadingSelect.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
}

export default ReadingSelect
