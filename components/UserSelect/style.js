import { css } from 'glamor'

const userInterface =
  css({
    fontSize: '15px',
    display: 'flex',
  }).toString()

const selectDevices = css({
  flexGrow: 1,
  width: '60%',
}).toString()

const selectReadings = css({
  flexGrow: 1,
  width: '40%',
}).toString()

export default {
  userInterface,
  selectReadings,
  selectDevices
}
