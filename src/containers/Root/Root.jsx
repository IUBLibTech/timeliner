import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import VariationsMainView from '../VariationsMainView/VariationsMainView';
import { PersistGate } from 'redux-persist/integration/react';

const Root = ({
  store,
  persistor,
  callback,
  hasResource,
  noFooter,
  noHeader,
  noVideo,
  noSourceLink,
}) => {
  try {
    return (
      <Provider store={store}>
        <PersistGate loading="loading..." persistor={persistor}>
          <VariationsMainView
            callback={callback}
            hasResource={hasResource}
            noFooter={noFooter}
            noHeader={noHeader}
            noVideo={noVideo}
            noSourceLink={noSourceLink}
          />
        </PersistGate>
      </Provider>
    );
  } catch (err) {
    return <div>{err}</div>;
  }
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  persistor: PropTypes.object.isRequired,
  callback: PropTypes.func,
  hasResource: PropTypes.bool,
  noFooter: PropTypes.bool,
  noHeader: PropTypes.bool,
  noVideo: PropTypes.bool,
  noSourceLink: PropTypes.bool,
};

export default Root;
