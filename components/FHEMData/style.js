import { css } from 'glamor';

const viewport = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(255, 255, 255, 0)',
}).toString();

const readingSelectContainer = css({
  height: '50px',
}).toString()

const chartContainer = css({
  flex:1,
  backgroundColor: 'rgba(255, 255, 255, 0)',
}).toString()

const chart = css({
  backgroundColor: 'rgba(255, 255, 255, 0)',
  flex: 1
}).toString()

export default {
  readingSelectContainer,
  chartContainer,
  chart,
  viewport
};
