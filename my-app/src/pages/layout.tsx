import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout } from "../reducers/authReducer";



const Layout = () => {
  const dispatch = useDispatch()

  let loggedUser = useSelector((state: RootState) => state.auth)
  
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
          <Link to="/profile">
            <Button color="inherit" variant="contained" sx={{ mr: 2 }}>
              Profile
            </Button>
          </Link>
          {loggedUser.someoneIsLogged ?  
               (
                <>                
                  <Button onClick={() => dispatch(logout())} color="inherit" variant="contained" sx={{ mr: 2 }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button color="inherit" variant="contained" sx={{ mr: 2 }}>
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button color="inherit" variant="contained">
                      Register
                    </Button>
                  </Link>
                </>
              )
            }
          
          
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Layout;
