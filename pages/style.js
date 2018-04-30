import { css } from 'glamor';

css.global('html, body, #root', {
  width: '100%',
  height: '100%',
  padding: 0,
  margin: 0
})

const rootContainer = css({
  width: '100%',
  height: '100%',
}).toString();

export default {
  rootContainer
};
