import { Link, useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import { Typography } from "@mui/material";


function UserC(props:{user: User}){
    const user = props.user

    return (
        <>
          {/* <hr />
          <Typography>
            {user.id}|{user.phoneNumber}|{user.name}|{user.surname}|{user.email}|{user.username}|{user.password}|{user.friends}
          </Typography>
          <hr /> */}
          <Link to={`/Profile/${user.id}`} style={{ textDecoration: 'none' }}>
            <Typography variant="body1" color="primary">{user.username}</Typography>
          </Link>
        </>
      )
}

export default UserC