import React, { useEffect, useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser, putUser } from "../api/user"
import { addUser , updateUser} from '../reducers/usersReducer';
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserForm(props: {userProp:User|null}){
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user:User|null = props.userProp   

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
        console.log("useEffect")
        if (user!=null) {
          setFormData({
            username: user.name,
            password: '',
            confirmPassword: '',
            name: user.name ,
            surname: user.surname,
            email: user.email,
            phoneNumber: user.phoneNumber as unknown as string,
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
		if(!numberRegex.test(formData.phoneNumber)){
			setError('Phone number must be a number')
			return
		}
		if(formData.phoneNumber.length !== 9){
			setError('Phone number must be 9 digits')
			return
		}
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
            postUser(userSend)
            dispatch(addUser(userSend))
            console.log('Registration successful!', formData);
            console.log('Redirecting to Test Page');
            toast("Succesful registration!");
            navigate('/Test');
        }else{
            putUser(userSend)
            dispatch(updateUser(userSend))
            console.log('Edition successful!', formData);
            console.log('Redirecting to Profile Page');
            navigate('profile');
        }
		
	}

    

	return (
		<>	
			<div>
				{error && <p>{error}</p>}
			</div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'/>
				<input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='username'/>
				<br></br>
                {(() => {
                   if(user===null){
                    return (
                        <>
                            <label htmlFor='password'/>
                            <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='password'/>
                            <br></br>
                            <label htmlFor='confirmPassword'/>
                            <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='confirm password'/>
                            <br></br>                        
                        </>
                    )
                   } 
                   return (<></>)
                })()}
				<label htmlFor='name'/>
				<input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='name'/>
				<br></br>
				<label htmlFor='surname'/>
				<input type='text' name='surname' value={formData.surname} onChange={handleChange} placeholder='surname'/>
				<br></br>
				<label htmlFor='email'/>
				<input type='text' name='email' value={formData.email} onChange={handleChange} placeholder='email'/>
				<br></br>
				<label htmlFor='phoneNumber'/>
				<input type='text' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} placeholder='phone number'/>
				<br></br>
				<button type='submit'>{formData.submitString}</button>
			</form>
		</>
	)

}

export default UserForm;
export {}