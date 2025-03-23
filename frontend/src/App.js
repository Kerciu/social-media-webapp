import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { UserProfile } from './pages/UserProfile';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/profile/:username" element={<Layout><PrivateRoute><UserProfile/></PrivateRoute></Layout>} />
            <Route path="/create-post" element={<Layout><PrivateRoute><CreatePost/></PrivateRoute></Layout>} />
            <Route path="/" element={<Layout><PrivateRoute><Home/></PrivateRoute></Layout>} />
            <Route path="/login" element={<Layout><Login/></Layout>} />
            <Route path="/register" element={<Layout><Register/></Layout>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
