import React, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUser, putUser } from "../../api/user"
import { addUser , updateUser} from '../../reducers/usersReducer';
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user";
import { v4 as uuidv4 } from 'uuid';
import { login } from '../../reducers/authReducer';
import { RootState } from '../../store';

import {Typography,TextField,Button,Container,Box,} from '@mui/material';
function UserForm(props: {userProp:User|null}){
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// if user is null, we are creating a new user
	// if user is not null, we are editing an existing user
	const user:User|null = props.userProp   
	const users = useSelector((state: RootState) => state.users).users
    console.log("user check", user?.id, user?.username )
    
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		name: "",
		surname: "",
		email: "",
		phoneNumber: "",
        submitString: "Register"
	})
    console.log("user check formdata", formData )

    useEffect(() => {
        if (user!=null) {
          setFormData({
            username: user.name,
            password: '',
            confirmPassword: '',
            name: user.name ,
            surname: user.surname,
            email: user.email,
            phoneNumber: String(user.phoneNumber),
            submitString: "Save"
          });
        }
      }, [user]);

    console.log("user check formdata", formData )

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	  };

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const numberRegex = /^[0-9]+$/;
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
	const handleSubmit = (event: any) => {
		event.preventDefault();
		if(!emailRegex.test(formData.email)){
			setError('Bad email')
			return
		}
		// if(!numberRegex.test(formData.phoneNumber)){
		// 	setError('Phone number must be a number')
		// 	return
		// }
		// if(formData.phoneNumber.length !== 9){
		// 	setError('Phone number must be 9 digits')
		// 	return
		// }
        if(user != null){
            if(formData.password.length < 8){
                setError('Password must be at least 8 characters')
                return
            }
            if(!passwordRegex.test(formData.password)){
                setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
                return
            }
            if(formData.password !== formData.confirmPassword){
                setError('Passwords do not match')
                return
            }
			if(users.find((user:User) => user.username === formData.username)){
				setError('Username already exists')
				return 
			}
        }
		
		setError('');

		const userSend:User = {
			id: uuidv4(),
			username: formData.username,
			password: formData.password,
			name: formData.name,
			surname: formData.surname,
			email: formData.email,
			phoneNumber: parseInt(formData.phoneNumber),
			friends: [],
		}
		
        if(user == null){
			// posting new user
            postUser(userSend)
            dispatch(addUser(userSend))
            console.log('Registration successful!', formData);
            console.log('Redirecting to Blog Page');
            navigate('/blog');
			dispatch(login(userSend))
        }else{
			// editing user
            putUser(userSend)
            dispatch(updateUser(userSend))
            console.log('Edition successful!', formData);
            console.log('Redirecting to Profile Page');
            navigate('profile');
        }
		
	}

    

	return (
		<>
		 <Container maxWidth="xs" sx={{ marginTop:8 }}>
			<Box>
				{error && <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 2 }}>{error}</Typography>}
			</Box>
			<form onSubmit={handleSubmit}>
				<TextField label="Username" variant="outlined" fullWidth margin="normal" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required sx={{ marginBottom: 1, marginRight: 1 }} />
		
				{user === null && <>
				<TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required sx={{ marginBottom: 1, marginRight: 1 }} />
				<TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required sx={{ marginBottom: 1, marginRight: 1 }} />
				</>}
		
				<TextField label="Name" variant="outlined" fullWidth margin="normal" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required sx={{ marginBottom: 1, marginRight: 1 }} />
		
				<TextField label="Surname" variant="outlined" fullWidth margin="normal" id="surname" name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" required sx={{ marginBottom: 1, marginRight: 1 }} />
		
				<TextField label="Email" variant="outlined" fullWidth margin="normal" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required sx={{ marginBottom: 1, marginRight: 1 }} />
		
				
				{/* <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" sx={{ marginBottom: 1, marginRight: 1 }} /> */}
				
				<Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>{formData.submitString}</Button>
			</form>
		  </Container>
		</>
	  );
	

}

export default UserForm;
export {}