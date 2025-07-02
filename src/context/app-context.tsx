import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({
  activeMenu: "/project",
  setActiveMenu: (activeMenu: string) => {},
});

export const AppContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<string>("userManage");

  // useEffect(() => {
  //   const splitPath = location.pathname.split("/");
  //   setActiveMenu("/" + splitPath[1]);
  // }, [location.pathname]);
  return (
    <AppContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
