import React, { useState } from 'react'
import {  Account } from 'near-api-js'
import { near } from '../../../services/nearConfig'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import useStore from '../../../store/wallets'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const WalletSearchModal = ({ isOpen, onClose }) => {
    const [walletId, setWalletId] = useState('');
    //const [walletInfo, setWalletInfo] = useState(null);
    const addWallet = useStore((state) => state.addWallet)

    // Configuration for NEAR
    // const nearConfig = {
    //     networkId: "testnet",
    //     nodeUrl: "https://rpc.testnet.near.org",
    //     walletUrl: "https://wallet.testnet.near.org",
    //     helperUrl: "https://helper.testnet.near.org",
    //     explorerUrl: "https://explorer.testnet.near.org",
    //     keyStore: new keyStores.BrowserLocalStorageKeyStore()
    // };

    // Function to handle the wallet search
    const handleSearch = async () => {
        try {
            // const near = await connect(nearConfig)
            const account = new Account(near.connection, walletId)
            const accountDetails = await account.state()
            addWallet({ id: walletId, ...accountDetails})
      
            console.log(accountDetails);
            onClose();
        } catch (error) {
            console.error('Error fetching wallet info:', error)
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="wallet-search-modal-title"
            aria-describedby="wallet-search-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography id="wallet-search-modal-title" variant="h6" component="h2">
                    Search NEAR Wallet
                </Typography>
                <TextField
                    fullWidth
                    label="Wallet ID"
                    variant="outlined"
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button onClick={handleSearch} sx={{ mt: 2 }}>Search</Button>
                {/* {walletInfo && (
                    <Typography sx={{ mt: 2 }}>
                        Balance: {walletInfo.amount}
                    </Typography>
                )} */}
            </Box>
        </Modal>
    );
};

export default WalletSearchModal
