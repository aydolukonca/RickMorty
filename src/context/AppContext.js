import React, { createContext, useReducer } from "react";

// Context oluşturma
const AppContext = createContext();

// Başlangıç durumu
const initialState = {
  filters: {},        // Coklu filtreler icin
  sort: null,         // Siralama bilgisi
  currentPage: 1,     // Aktif sayfa
  pageSize: 10,       // Sayfa basina gösterilecek veri sayisi
  error: null,        // Global hata durumu
};

// Reducer fonksiyonu
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Provider bileseni
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
