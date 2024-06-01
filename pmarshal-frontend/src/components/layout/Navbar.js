import React, { useState } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import './Navbar.css'
import WalletSearch from '../ui/Wallet Searcher/WalletSearchModal'

export default function Navbar() {
  const [showWalletSearchModal, setWalletSearchModal] = useState(false);

  return (
    <div className='navbar'>
      <div className='navbar-left'>
          <Button variant='contained' startIcon={<AddIcon/>}
            onClick={() => setWalletSearchModal(true)}>
            Add Wallet
          </Button>
          <Button variant='contained' startIcon={<AddIcon/>}>
            Add Portfolio
          </Button>
      </div>
      <div className='navbar-center'>
          <WalletSearch isOpen={showWalletSearchModal} onClose={() => setWalletSearchModal(false)} />
          {/* <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a> */}
      </div>
      <div className='navbar-right'>
          {/* <span>Profile</span> */}
      </div>
    </div>
  )
}
