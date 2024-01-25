import React, { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from "../api/user"
import { addUser } from '../reducers/usersReducer';
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "../types/user";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserForm from '../components/usersComponents/UserForm';

function UserEdit(){

	const {state} = useLocation()

	return (
		<>	
			<p>Siema</p>
			<div>
				<UserForm userProp = {state.user}/>
			</div>	
		</>
	)

}

export default UserEdit;