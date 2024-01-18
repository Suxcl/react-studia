import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const HomePage: React.FC = () => (
	
	<div>
		<h1>Blog</h1>
		<Link to="/TestParams/2">Go to User 42 Page</Link>
	</div>
);





export default HomePage;