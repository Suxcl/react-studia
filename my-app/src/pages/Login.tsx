import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/authReducer";

import { Typography, TextField, Button, Container } from '@mui/material';

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();


    let users = useSelector((state: RootState) => state.users).users
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })


	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	  };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let user = users.find((user) => user.username === formData.username)
        if(user){
            if(user.password === formData.password){
                dispatch(login(user))
                navigate(`/blog`)
            }else{
                setError("Wrong username or password")
            }
        }else{
            setError("Wrong username or password")
        }
    }
        

    return (
        <Container maxWidth="xs" sx={{ marginTop: 8 }}>
          <Typography variant="h4" component="div" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
                {error}
              </Typography>
            )}
          </form>
        </Container>
      )
    }


export default Login