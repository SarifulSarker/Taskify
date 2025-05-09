import { Home } from './pages/home';
import { Signup } from './pages/Signup';
import { Login } from './pages/login';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AllTasks } from './pages/AllTasks.jsx';
import { ImportantTasks } from './pages/ImportantTasks.jsx';
import { CompleteTasks } from './pages/CompleteTasks.jsx';
import { IncompleteTasks } from './pages/IncompleteTasks.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { authActions } from "./store/auth.js";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // Check token from localStorage on first load
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    // If not logged in and not on login/signup page, redirect to login
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate("/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div className="bg-gray-900 text-white h-screen p-2">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="importantTasks" element={<ImportantTasks />} />
          <Route path="completeTasks" element={<CompleteTasks />} />
          <Route path="incompleteTasks" element={<IncompleteTasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
