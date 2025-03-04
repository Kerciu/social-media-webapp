import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { UserProfile } from './routes/userProfile';
import Layout from './components/layout/Layout';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/:username" element={
            <Layout><UserProfile/></Layout>
          } />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
