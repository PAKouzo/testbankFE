
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LogInPage from "./pages/login";
import SignUpPage from "./pages/signup";
import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
