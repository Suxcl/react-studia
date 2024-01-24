import { User } from "../types/user"
import UserC from "./UserC"


function UsersList(props: {usersList: User[]}) {

    return (
        <>
        <ul>
            {
                props.usersList.map((user: User) => (
                    <li key={user.id}>
                        <UserC user={user}/>
                    </li>
                ))
            }
                
            
        </ul>
            
        </>
    )
}


export default UsersList