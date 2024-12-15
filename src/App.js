import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import Table from "./components/Table";

function App() {
  const context = useContext(AppContext);

  console.log("AppContext Değeri:", context); // Degeri kontrol etmek icin

  if (!context) {
    return <div>AppContext yüklenemedi.</div>;
  }

  const { state } = context;

  return (
    <div className="App">
      {state.error && <div style={{ color: "red" }}>{state.error}</div>}
      <Table />
    </div>
  );
}

export default App;
