import React from 'react';
import { useParams } from 'react-router-dom';

interface Params {
	id: string;
    [key: string]: string;
}

const UserPage: React.FC = () => {
	const { id } = useParams<Params>();
    
	return (
		<div>
			<h1>Test Params Page</h1>
			<p>ID: {id}</p>
		</div>
	);
};

export default UserPage;