import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Footer, Navigation } from "./components/index";
import { useUserContext } from "./contexts/UserContext";
import {
  Home,
  Register,
  Login,
  UserPage,
  ErrorPage,
  PhotoPage,
  EditPost,
} from "./pages";
const App = () => {
  const { data } = useUserContext();

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={!data ? <Login /> : <Navigate to="/" />} />
        <Route
          path="register"
          element={!data ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="user/*"
          element={data ? <UserPage /> : <Navigate to="/" />}
        />
        <Route path="photo/:id" element={<PhotoPage />} />
        <Route path="edit-post/:id" element={<EditPost />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
