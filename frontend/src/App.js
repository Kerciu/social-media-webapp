import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { UserProfile } from './pages/UserProfile';
import Layout from './components/layout/Layout';
import Login from './pages/Login';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/profile/:username" element={<Layout><UserProfile/></Layout>} />
          <Route path="/login" element={<Layout><Login/></Layout>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
