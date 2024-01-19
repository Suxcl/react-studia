import { useDispatch, useSelector } from "react-redux";
import { addTopping } from "../reducers/pizzaSlice";
import {selectUsers,addUser, removeUser, updateUser, getUsers } from "../reducers/usersReducer";


import { User } from "../types/user";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";


function Test(){
    const dispatch = useAppDispatch();

    
    const postStatus = useAppSelector(state => state.user.status);
    const users = useAppSelector(selectUsers);

    useEffect(() => {
        if (postStatus === 'pending') {
          dispatch(getUsers())
        }
    }, [users,postStatus, dispatch])

    let content

    if (postStatus === 'pending') {
        content = <div>Loading...</div>
    } else if (postStatus === 'fulfilled') {
        const orderedUsers = users.slice();
        console.log(orderedUsers);

        if (orderedUsers instanceof Array){
            content = orderedUsers.map(user=>{
                let username = user.username;
                console.log(username);
                return <div key={user.id}> {user.username} </div>
            })
            console.log(content);
        }
    }


    return (
        <>
            <h1>Testing Grounds</h1>
            <hr></hr>
            <h1>Users</h1>
            
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
            {content}
            {/* {users.map((user: User) =>
                <>
                    <li>{user.id}|{user.name}|{user.surname}|{user.email}|{user.username}|{user.password}|{user.friends}</li>
                    <button onClick={() => dispatch(removeUser(user.id))}>Delete User</button>
                    <button onClick={() => dispatch(updateUser(user.id))}>Edit User</button>
                </>
            )} */}
            <button onClick={() => dispatch(addUser({id: 1, name: 'Sak'}))}>Add User</button>
        </>
    )
}

export default Test