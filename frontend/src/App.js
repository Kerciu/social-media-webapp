import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { UserProfile } from './pages/UserProfile';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/profile/:username" element={<Layout><UserProfile/></Layout>} />
            <Route path="/login" element={<Layout><Login/></Layout>} />
            <Route path="/register" element={<Layout><Register/></Layout>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
