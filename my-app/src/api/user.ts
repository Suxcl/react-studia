import axios, { AxiosResponse } from 'axios';
import type {User} from "../types/user";


const URL = 'http://51.83.130.126:3000/users_react'

interface Users{
    users:User[]
}


export const getUsers = async() => {
    try{
        console.log(URL)
        const response: AxiosResponse<Users> = await axios.get<Users>(`${URL}`)
        console.log(response.data)
        return response.data
    }catch(error){
        return []
    }
}


export const postUser = async(user:User) => {
    await axios.post(`${URL}`, {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,
        password: user.password,
        friends: []
    }).then(response => {
        console.log("post user successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}

export const putUser = async(user:User) => {
    await axios.patch(`${URL}/${user.id}`, {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,
        password: user.password,
        friends: []
    }).then(response => {
        console.log("patch user successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}

export const deleteUser = async(id:string) => {
    await axios.delete(`${URL}/${id}`).then(response => {
        console.log("delete user successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}



// export const getAllUsers = (): User[] => {
//     return users
// }
// export const getUser = (id:number): User | undefined => {
//     return users.find(user => user.id === id)
// }

// export const createUser = (user: User): void => {
//     users.push(user)
    

// }

