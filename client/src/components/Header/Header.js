import React, {useState} from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

function Header() {
  const isLogged = localStorage.getItem('name') ? true : false

  const logoutUser = async () => {

    localStorage.clear()

    window.location.href = "/";
}
const LoggedRouter = () => {
  return (
      <>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
              <MenuItem component="a" href='/' onClick={handleCloseNavMenu}>Ana Sayfa</MenuItem>
              <MenuItem component="a" href='/add' onClick={handleCloseNavMenu}>Servis Ekle</MenuItem>
              <MenuItem component="a" href='/archive' onClick={handleCloseNavMenu}>Arşiv</MenuItem>
              {/* <MenuItem component="a" href='/test' onClick={handleCloseNavMenu}>Test</MenuItem> */}
              <MenuItem component="a" onClick={logoutUser}>Çıkış Yap</MenuItem>
            </Menu>
          </Box>
          <PrecisionManufacturingIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography variant="h5" noWrap component="a" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
            TKNKOTOMSYN
          </Typography>
          <Box sx={{display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'end' }}>
            <Button href="/" sx={{ m: 1, color: 'white' }}>Ana Sayfa</Button>
            <Button href="/add" sx={{ m: 0.5, color: 'white' }}>Servis Ekle</Button>
            <Button href="/archive" sx={{ m: 0.5, color: 'white' }}>Arşiv</Button>
            {/* <Button href="/test" sx={{ m: 0.5, color: 'white' }}>Test</Button> */}
            <Button sx={{ m: 0.5, color: 'white' }} onClick={logoutUser}>Çıkış Yap</Button>
          </Box>
      </>
  )
}
const nonLoggedRouter = () => {
  return (
      <>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
              {/* <MenuItem component="a" href='/test' onClick={handleCloseNavMenu}>Test</MenuItem> */}
              <MenuItem component="a" href='/login' onClick={handleCloseNavMenu}>Giriş Yap</MenuItem>
            </Menu>
          </Box>
          <PrecisionManufacturingIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography variant="h5" noWrap component="a" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
            TKNKOTOMSYN
          </Typography>
          <Box sx={{display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, justifyContent: 'end' }}>
            {/* <Button href="/test" sx={{ m: 0.5, color: 'white' }}>Test</Button> */}
            <Button href="/login" sx={{ m: 0.5, color: 'white' }}>Giriş Yap</Button>
          </Box>
      </>
  )
}
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PrecisionManufacturingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="h6" noWrap component="a" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
            TEKNIKOTOMASYON
          </Typography>
          {isLogged ? LoggedRouter() : nonLoggedRouter()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;