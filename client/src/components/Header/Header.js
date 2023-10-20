import React, { useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const logoutUser = async () => {

    localStorage.clear()

    window.location.href = "/";
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <center>
      <AppBar position="fixed" sx={{ bgcolor: '#0c5834', borderRadius: '60px', width: '97%', zIndex: 1000, right: '0', left: '0', margin: '0 auto', marginTop: '10px' }}>
        <Container maxWidth="xl">
          <Toolbar>

            {/* Mobil Header Started */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none' } }}>
              <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                <MenuItem component="a" href='/' onClick={handleCloseNavMenu}>Ana Sayfa</MenuItem>
                <MenuItem component="a" href='/add' onClick={handleCloseNavMenu}>Servis Ekle</MenuItem>
                <MenuItem component="a" href='/archive' onClick={handleCloseNavMenu}>Arşiv</MenuItem>
                <MenuItem component="a" onClick={logoutUser}>Çıkış Yap</MenuItem>
              </Menu>
            </Box>
            <PrecisionManufacturingIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, textAlign: 'left' }} />
            <Typography variant="h5" noWrap sx={{ display: { xs: 'none', sm: 'flex', md: 'none' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', float: 'left' }}>
              TKNKOTOMSYN
            </Typography>
            <Typography variant="h5" noWrap sx={{ display: { xs: 'flex', sm: 'none' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', float: 'left' }}>
              TKNKOTO
            </Typography>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto' }}>
              <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
            {/* Mobil Header Finished */}

            {/* PC Header Started */}
            <PrecisionManufacturingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography variant="h6" noWrap component="a" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
              TEKNIKOTOMASYON
            </Typography>
            <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'end', fontFamily: 'Poppins' }}>
              <Button href="/" sx={{ m: 1, color: 'white', fontFamily: 'Poppins', textTransform: 'capitalize' }}>Ana Sayfa</Button>
              <Button href="/add" sx={{ m: 0.5, color: 'white', fontFamily: 'Poppins', textTransform: 'capitalize' }}>Servis Ekle</Button>
              <Button href="/archive" sx={{ m: 0.5, color: 'white', fontFamily: 'Poppins', textTransform: 'capitalize' }}>Arşiv</Button>
              <Button sx={{ m: 0.5, color: 'white', fontFamily: 'Poppins', textTransform: 'capitalize' }} onClick={logoutUser}>Çıkış Yap</Button>
              {/* PC Header Finished */}

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </center>
  );
}
export default Header;