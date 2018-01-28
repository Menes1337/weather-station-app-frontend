import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';

/**
 * get a list of devices
 * @return {Promise<Object>} the result
 */
const getDevices = () => (dispatch, getState) => {
  new PipelineRequest('getDevices')
    .setInput({ })
    .dispatch()
    .then(result => {
      return result
    })
    .catch((error) => {
      logger.error(error);
      dispatch(errorProductOptions(productId));
    });
};

export default getDevices;
