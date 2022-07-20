import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import AddEditTour from "./pages/AddEditTour";
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagTours from "./pages/TagTours";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GoogleOAuthProvider clientId="355422561461-772h30g0k6qvqbabrssh100gcoa4c3kv.apps.googleusercontent.com">
      <BrowserRouter>
        <div className="App">
          <Header />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours/search" element={<Home />} />
            <Route path="/tours/tag/:tag" element={<TagTours />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addTour" element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
            {/* editing tour based on id  */}
            <Route path="/editTour/:id" element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
            <Route path="/tour/:id" element={<SingleTour />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
