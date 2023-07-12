import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid p={3}><span><Link className="navbar-link" to="/">Ana Sayfa</Link></span></Grid>
            <Grid p={3}><span><Link className="navbar-link" to="/add">Servis Ekle</Link></span></Grid>
            <Grid p={3}><span><Link className="navbar-link" to="/archive">Tamamlanmış Servisler</Link></span></Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;