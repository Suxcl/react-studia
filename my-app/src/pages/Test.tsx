import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, updateUser, setUsers } from "../reducers/usersReducer";
import { getUsers } from "../api/user"

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../store";


import type { User } from "../types/user";
import UsersList from "../components/UsersList";


function Test(){
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchUsersAsync = async () => {
            try{
                const result = await getUsers()
                dispatch(setUsers(result as User[]))
                console.log(result)
            }catch(error){
                console.log(error)
            }      
        }
        fetchUsersAsync()
    },[dispatch])

    let users = useSelector((state: RootState) => state.users).users



    return (
        <>
            <h1>Testing Grounds</h1>
            <hr></hr>
            <h1>Users</h1>
            <hr></hr>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
            <hr></hr>
            <UsersList usersList={users}/>
            <hr></hr>
            {/* {users.map((user: User) => {
                return(
                    <li key={user.id}>
                        {user.id}|{user.phoneNumber}|{user.name}|{user.surname}|{user.email}|{user.username}|{user.password}|{user.friends}
                        <button onClick={() =>EditUser(user.id)}>Edit</button>
                        <button onClick={() =>RemoveUser(user.id)}>Delete</button>
                    </li>
                )
            })} */}
            <hr></hr>
            <h1>Posts</h1>
            <hr></hr>
            <h1>Invites</h1>
        </>
    )
}

export default Test