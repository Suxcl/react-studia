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
      <AppBar position="fixed" sx={{ bgcolor: "#7D84B2" }}>
        
        <Toolbar>
          <Link to="/blog">
            <Button color="inherit" variant="contained" sx={{ mr: 2 }}>
              Home
            </Button>
          </Link>
          {loggedUser.someoneIsLogged ?  
               (
                <>         
                  <Link to={`/Profile/${loggedUser.user?.id}`}>
                    <Button color="inherit" variant="contained" sx={{ mr: 2 }}>
                      Profile
                    </Button>
                  </Link>
                  <Link to="/Blog">       
                  <Button onClick={() => dispatch(logout())} color="inherit" variant="contained" sx={{ mr: 2 }}>
                    Logout
                  </Button>
                  </Link>
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
