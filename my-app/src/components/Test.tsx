import { useDispatch, useSelector } from "react-redux";
import { addTopping } from "../reducers/pizzaSlice";
import { addUser, removeUser, updateUser } from "../reducers/usersReducer";


import { User } from "../types/user";


function Test(){
    const pizza = useSelector((state: any) => state.pizza);
    let users = useSelector((state: any) => state.users);
    if(!users) users = []
        
    console.log(users)
    const dispatch = useDispatch();

    return (
        <>
            <h1>Pizza</h1>
            {pizza.toppings.map((topping: string) => 
                <li key={topping}>{topping}</li>
            )}
            <button onClick={() => dispatch(addTopping('pepperoni'))}>Add Pepperoni</button>

            <h1>Users</h1>
            {users.map((user: User) =>
                <>
                    <li>{user.id}|{user.name}|{user.surname}|{user.email}|{user.username}|{user.password}|{user.friends}</li>
                    <button onClick={() => dispatch(removeUser(user.id))}>Delete User</button>
                    <button onClick={() => dispatch(updateUser(user.id))}>Edit User</button>
                </>
            )}
            <button onClick={() => dispatch(addUser({id: 1, name: 'Sak'}))}>Add User</button>
        </>
    )
}

export default Test