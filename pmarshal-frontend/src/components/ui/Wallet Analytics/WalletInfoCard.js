import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

function WalletInfoCard({ wallet, portfolioName }) {
  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '600px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Grid container alignItems="center">
            <Grid item>
              <Avatar style={{ marginRight: '10px', backgroundColor: '#1976d2' }}>
                <span role="img" aria-label="icon">🔍</span>
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" component="div">
                Wallet Analytics
              </Typography>
              <Typography color="text.secondary">
                {portfolioName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                {/* Timestamp or any other info */}
                Storage Usage: {wallet?.storage_usage}
              </Typography>
            </Grid>
          </Grid>
          <Divider style={{ margin: '10px 0' }} />
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="body1">Wallet ID:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="right">{wallet?.id}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="body1">Balance:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="right">{wallet?.amount}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="body1">Block Hash:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="right">{wallet?.block_hash}</Typography>
            </Grid>
          </Grid>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="body2" color="text.secondary" align="center" style={{ cursor: 'pointer' }}>
            X More details
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default WalletInfoCard