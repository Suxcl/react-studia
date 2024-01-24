import { User } from "../types/user"
import { useDispatch, useSelector } from "react-redux";
import { removeUser, updateUser } from "../reducers/usersReducer";
import { putUser, deleteUser } from "../api/user"
import { useNavigate } from "react-router-dom";


function UserC(props:{user: User}){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function EditUser(user:User){
        navigate(`/UserEdit`, {state: {user}})
        // dispatch(updateUser(user.id))
        // putUser(user)
    }

    function RemoveUser(id: string){
        dispatch(removeUser(id))
        deleteUser(id)
    }

    const user = props.user

    return (
        <>
            {user.id}|{user.phoneNumber}|{user.name}|{user.surname}|{user.email}|{user.username}|{user.password}|{user.friends}
            <button onClick={() =>EditUser(user)}>Edit</button>
            <button onClick={() =>RemoveUser(user.id)}>Delete</button>
        </>
    )
}

export default UserC