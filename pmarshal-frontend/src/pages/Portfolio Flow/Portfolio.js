import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import useStore from '../../store/wallets';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import './Portfolio.css';

const Portfolio = () => {
  const navigate = useNavigate();
  const storeWallets = useStore((state) => state.wallets);
  const [portfolio, setPortfolio] = useState([
    { id: 1, name: 'My First Portfolio', wallets: [] },
  ]);

  useEffect(() => {
    setPortfolio((prevPortfolio) => {
      const newPortfolio = [...prevPortfolio];
      newPortfolio[0].wallets = storeWallets; // Update the wallets list
      return newPortfolio;
    });
  }, [storeWallets]);

  const handleRowClick = (portfolioName, walletId) => {
    navigate(`/portfolio/${portfolioName}/${walletId}`);
  };

  return (
    <>
      <h1>Portfolio</h1>
      <div className="portfolio-page">
        {portfolio.map((portfolio) => (
          <div key={portfolio.id} className="portfolio-section">
            <h2 className="portfolio-title">{portfolio.name}</h2>
            <Card className="portfolio-card">
              <CardContent>
                <TableContainer component={Paper} style={{ border: '1px solid black', width: '22rem' }}>
                  <Table className="wallet-table" aria-label="wallet table">
                    <TableBody>
                      {portfolio.wallets.length > 0 ? (
                        portfolio.wallets.map((wallet) => (
                          <TableRow 
                            key={wallet.id} 
                            className='wallet-table-row'
                            onClick={() => handleRowClick(portfolio.name, wallet.id)}>
                            <TableCell align="center" scope="row" className="wallet-table-cell" style={{ width: '100%' }}>
                              {wallet.id}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2} align="center" className="wallet-table-cell">
                            <div className="empty-card">+</div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Portfolio;
