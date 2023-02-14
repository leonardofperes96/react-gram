import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Navigation } from "./components/index";
import { Home, Register, CreatePost, Login, UserPage } from "./pages";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="user" element={<UserPage />} />
        <Route />
        <Route />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
