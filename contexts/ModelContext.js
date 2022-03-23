import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const ModelContext = createContext();

const ModelProvider = ({ model, children }) => (
  <ModelContext.Provider value={model}>{children}</ModelContext.Provider>
);

ModelProvider.defaultProps = {
  model: null,
};

ModelProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  model: PropTypes.any,
};

export { ModelContext, ModelProvider };
