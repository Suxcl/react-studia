import React, { useId, useState } from 'react';
import { useLocation} from "react-router-dom";
import UserForm from '../components/usersComponents/UserForm';

function UserEdit(){
	document.title = "User edit Page";
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