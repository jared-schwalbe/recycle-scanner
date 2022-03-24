import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const closeModal = () => setModal(null);
  const openModal = (render, props) => setModal(render({ closeModal, ...props }));

  return (
    <ModalContext.Provider value={openModal}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export { ModalContext, ModalProvider };
