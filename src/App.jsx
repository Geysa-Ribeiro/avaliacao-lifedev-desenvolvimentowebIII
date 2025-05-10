import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/indexDashboard';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost'; 
import PostView from './pages/PostView/index';


function App() {
  return (
    <Router>
    <AuthProvider>
    <div className="App">
        <Navbar />
        <div className="content-wrapper">
        <Routes>
          {/*Rotas públicas*/}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*Rotas protegidas*/}
          <Route element ={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path="/post/:id" element={<PostView/>} /> 
          </Route>

          <Route path="*" element={<h1> Página não encontrada</h1>} /> 
        </Routes>
        </div>
        <Footer />
        </div>
        </AuthProvider>
      </Router>
  );
}

export default App;
