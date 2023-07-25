import Head from 'next/head';
import { Navbar } from '../navbar/Navbar';
import { useState, createContext, useCallback } from 'react';

export const NavbarContext = createContext();

const Main = ({ children }) => {
  const [showPanel, setShowPanel] = useState(null);
  const [showSheets, setShowSheets] = useState(true);
  const [theme, setTheme] = useState('white');
  const [loader, setLoader] = useState(true)

  const getPanel = useCallback(() => {
    setShowPanel(panel => !panel);
  }, []);

  const getSheets = useCallback(() => {
    setShowSheets(sheets => !sheets);
  }, []);

  return (
    <>
      <Head>
        <meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1, maximum-scale=1'}
        />
        <title>City AI</title>
      </Head>

      <NavbarContext.Provider
        value={{ showPanel, getPanel, showSheets, getSheets, theme, setTheme, loader, setLoader }}
      >
        <Navbar />
        {children}
      </NavbarContext.Provider>
    </>
  );
};

export default Main;
