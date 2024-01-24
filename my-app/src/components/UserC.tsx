import { User } from "../types/user"
import { useDispatch, useSelector } from "react-redux";
import { removeUser, updateUser } from "../reducers/usersReducer";
import { putUser, deleteUser } from "../api/user"


function UserC(props:{user: User}){
    const dispatch = useDispatch();

    function EditUser(id:string){
        dispatch(updateUser(id))
        putUser(id)
    }

    function RemoveUser(id: string){
        dispatch(removeUser(id))
        deleteUser(id)
    }

    const user = props.user

    return (
        <>
            {user.id}|{user.phoneNumber}|{user.name}|{user.surname}|{user.email}|{user.username}|{user.password}|{user.friends}
            <button onClick={() =>EditUser(user.id)}>Edit</button>
            <button onClick={() =>RemoveUser(user.id)}>Delete</button>
        </>
    )
}

export default UserC