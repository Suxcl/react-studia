import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Layout = () => {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#9b5de5" }}>
        
        <Toolbar>
          <Link to="/blog">
            <Button color="inherit" variant="contained" sx={{ mr: 2 }}>
              Home
            </Button>
          </Link>
          <Link to="/test">
            <Button color="inherit" variant="contained" sx={{ mr: 2 }}>
              Test
            </Button>
          </Link>
          <Link to="/">
            <Button color="inherit" variant="contained" sx={{ mr: 2 }}>
              Profile
            </Button>
          </Link>
          <Link to="/contact">
            <Button color="inherit" variant="contained" sx={{ mr: 2 }}>
              Login
            </Button>
          </Link>
          <Link to="/contact">
            <Button color="inherit" variant="contained">
              Register
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Layout;
