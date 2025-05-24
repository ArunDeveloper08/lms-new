import { createContext, useState } from "react";

export const DataContext = createContext(null);
const DataProvider = ({ children }) => {
    const [tool, setTool] = useState([]);
    const [searchChallan, setSearchChallan] = useState("");

  return (
    <DataContext.Provider value={{tool, setTool,searchChallan, setSearchChallan }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;