import React from 'react';
import { render } from 'react-dom';
import onload from '@shopgate/pwa-core/commands/onload';
import { isDev } from '@shopgate/pwa-common/helpers/environment';
import Pages from './pages';

const rootElement = document.getElementById('root');

if (isDev) {
  const { AppContainer } = require('react-hot-loader'); // eslint-disable-line global-require

  render(
    <AppContainer>
      <Pages />
    </AppContainer>,
    rootElement,
    onload
  );

  if (module.hot) {
    module.hot.accept('./pages', () => {
      const NextPages = require('./pages').default; // eslint-disable-line global-require

      render(
        (
          <AppContainer>
            <NextPages />
          </AppContainer>
        ),
        rootElement
      );
    });
  }
} else {
  render(
    <Pages />,
    rootElement,
    onload
  );
}
