import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [settings, setSettings] = useState({
    showTranslate: true,
    showButtons: true,
  });

  const sharedState = {
    data: settings,
    setData: (value) => {
      setSettings(value);
    },
  };

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
