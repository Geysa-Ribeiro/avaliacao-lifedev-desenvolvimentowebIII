import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/indexDashboard';
import CreatePost from './pages/CreatePost/CreatePost';
import PostView from './pages/PostView/index';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
            //Rotas públicas//
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

            //Rotas protegidas//
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/createpost" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="/post/:id" element={<PrivateRoute><PostView /></PrivateRoute>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
