import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './Pages/HomePage';
import GradesPage from './Pages/GradesPage';
import NotFoundPage from './Pages/NotFoundPage';

function App() {


  return (
    <Router> {/* Ensure that the Router wraps your entire application */}
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path="/grades" element={<GradesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
