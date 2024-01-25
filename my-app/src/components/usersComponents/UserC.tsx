
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../reducers/usersReducer";
import { deleteUser } from "../../api/user";
import { User } from "../../types/user";


function UserC(props:{user: User}){
    const user = props.user

    return (
        <>
            {/* <hr></hr>
            {user.id}|{user.phoneNumber}|{user.name}|{user.surname}|{user.email}|{user.username}|{user.password}|{user.friends}
            <hr></hr> */}
            <Link to={`/Profile/${user.id}`}><p>{user.username}</p></Link>
        </>
    )
}

export default UserC