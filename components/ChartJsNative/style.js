import { css } from 'glamor'

css.global('html, body, #root', {
  width: '100%',
  height: '100%',
  padding: 0,
  margin: 0
})

const chartContainer = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

}).toString()

const chartUserSelect = css({
  height: '50px'
}).toString()

const chartWrapper = css({
  backgroundColor: 'rgba(255, 255, 255, 0)',
  flex: 1
}).toString()

const chart = css({
  backgroundColor: 'rgba(255, 255, 255, 0)',
  flex: 1
}).toString()

export default {chart, chartWrapper, chartContainer, chartUserSelect}
