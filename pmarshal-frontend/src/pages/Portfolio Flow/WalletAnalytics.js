import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../../store/wallets';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import WalletInfoCard from '../../components/ui/Wallet Analytics/WalletInfoCard';
import './WalletAnalytics.css'

const WalletAnalytics = () => {
  const { portfolioName, walletId } = useParams();
  const navigate = useNavigate();
  const storeWallets = useStore((state) => state.wallets);
  const wallet = storeWallets.find(wallet => wallet.id === walletId);
  const [transactions, setTransactions] = useState([]); 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`https://api3-testnet.nearblocks.io/v1/account/${walletId}/txns?page=1&per_page=25&order=desc`);
                                      
        const data = await response.json();

        setTransactions(data.txns)

        console.log("trans: ", data)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    };

    fetchTransactions();
  }, [walletId]); 

  const handleRowClick = (transactionHash) => {
    navigate(`/portfolio/${portfolioName}/${walletId}/${transactionHash}/trans-link`)
  }

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <WalletInfoCard 
        wallet={wallet} 
        portfolioName={portfolioName} />
      <Divider style={{ margin: '10px 0' }} />
      <Card style={{ width: '800px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h6" component="div" style={{ marginBottom: '10px' }}>
            Transactions
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="transactions table">
              <TableHead>
                <TableRow>
                  <TableCell>To</TableCell>
                  <TableCell>Hash</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Fee</TableCell>
                  <TableCell align="left">Receipt ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow 
                    className='trans-trable-rows'
                    key={transaction.transaction_hash}
                    onClick={() => handleRowClick(transaction.transaction_hash)}
                    >
                    <TableCell component="th" scope="row">{transaction.receiver_account_id}</TableCell>
                    <TableCell>
                      {transaction.transaction_hash}
                    </TableCell>
                    <TableCell align="left" scope="row">{new Date(transaction.block_timestamp / 1e6).toLocaleString()}</TableCell>
                    <TableCell align="left" scope="row">{transaction.outcomes_agg.transaction_fee}</TableCell>
                    <TableCell align="left" scope="row">{transaction.receipt_id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" align="center" style={{ cursor: 'pointer', paddingTop: '1rem' }}>
            X More details
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletAnalytics;
