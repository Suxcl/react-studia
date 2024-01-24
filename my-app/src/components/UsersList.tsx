import { User } from "../types/user"
import UserC from "./UserC"


function UsersList(props: {usersList: User[]}) {

    return (
        <>
            {props.usersList.map((user: User) => {
                return(
                    <>
                        <p><UserC user={user}/>   </p>
                    </>
                )
            })}
        </>
    )
}


export default UsersList