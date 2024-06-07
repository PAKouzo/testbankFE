
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LogInPage from "./pages/login";
import SignUpPage from "./pages/signup";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
