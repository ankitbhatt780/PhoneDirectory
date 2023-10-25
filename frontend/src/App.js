import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import AllRoutes from "./Components/Routes/AllRoutes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AllRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
