import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/authReducer";



function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();


    let users = useSelector((state: RootState) => state.users).users
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })


	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	  };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let user = users.find((user) => user.username === formData.username)
        if(user){
            if(user.password === formData.password){
                dispatch(login(user))
                navigate(`/blog`)
            }else{
                setError("Wrong username or password")
            }
        }else{
            setError("Wrong username or password")
        }
    }
        

    return (
        <>  
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" onClick={handleSubmit}>Login</button>
                {error && <p>{error}</p>}
            </form>
        </>
    )
}

export default Login