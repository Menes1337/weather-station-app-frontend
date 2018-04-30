import React from 'react';
import '@shopgate/pwa-common/styles/reset';
import App from '@shopgate/pwa-common/App';
import locale from '../locale';
import reducers from './reducers';
import subscribers from './subscribers';
import styles from './style'
import FHEMData from '../components/FHEMData'

/**
 * The theme's main component defines all the routes (views) inside the application.
 * @returns {JSX}
 */
const Pages = () => (
  <App locale={locale} reducers={reducers} subscribers={subscribers} className={styles.rootContainer}>
    <FHEMData />
  </App>
);

export default Pages;
