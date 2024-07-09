import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Scanner from "./components/pages/Scanner";
import Form from "./components/pages/Form";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/scanner" Component={Scanner}/>
        <Route path="/form" Component={Form}/>
      </Routes>
    </BrowserRouter>
  
    
    </>
  );
}

export default App;
