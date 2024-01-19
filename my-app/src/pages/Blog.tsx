import React from 'react';
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => (
	
	<div>
		<h1>Blog</h1>
		<Link to={"/TestParams/" + 42}>Go to User 42 Page</Link>
	</div>
);



export default HomePage;