import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import HomePage from './Pages/HomePage';
import GradesPage from './Pages/GradesPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';

const App = () => {


  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
