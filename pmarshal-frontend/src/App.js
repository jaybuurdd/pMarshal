import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ResponsiveContainer from './utils/ResponsiveContainer';
import Navbar from './components/layout/Navbar';
import Portfolio from './pages/Portfolio Flow/Portfolio';
import WalletAnalytics from './pages/Portfolio Flow/WalletAnalytics';
import TransLink from './pages/Portfolio Flow/TransLink';

export default function App() {
  return (
      <ResponsiveContainer>
        <Navbar />
        <Routes>
          <Route path='/' element={<Portfolio />} />
          <Route path='/portfolio' element={<Navigate replace to='/' />} />
          <Route path="/portfolio/:portfolioName/:walletId" element={<WalletAnalytics />} />
          <Route path="/portfolio/:portfolioName/:walletId/:transactionHash/trans-link" element={<TransLink />} />
        </Routes>
      </ResponsiveContainer> 
  );
}

