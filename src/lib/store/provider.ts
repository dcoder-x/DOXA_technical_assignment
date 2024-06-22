import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; // Adjust the import path as necessary

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default AppProvider;
