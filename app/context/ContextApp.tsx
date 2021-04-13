import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [settings, setSettings] = useState({
    showTranslate: true,
    showButtons: true,
  });
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(0);
  const [prevPage, setPrevPage] = useState('');

  const sharedState = {
    data: settings,
    setData: (value) => {
      setSettings(value);
    },
    showLink: show,
    setShowLink: (value) => {
      setShow(value);
    },
    vocabularyPage: page,
    setVocabularyPage: (value) => {
      setPage(value);
    },
    previousPageName: prevPage,
    setPreviousPageName: (value) => {
      setPrevPage(value);
    },
  };

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
