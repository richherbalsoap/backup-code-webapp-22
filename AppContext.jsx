import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [schoolName, setSchoolName] = useState('EDULinker');

  return (
    <AppContext.Provider value={{ schoolName, setSchoolName }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
