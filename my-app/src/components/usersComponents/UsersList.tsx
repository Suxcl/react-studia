import { Link } from "react-router-dom"
import { User } from "../../types/user"
import UserC from "./UserC"
import { List, ListItem, Paper, TextField, Typography } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";

function UsersList(props: {usersList: User[]}) {
  
  const [searchQuery, setSearchQuery] = useState('');
  const usersList = props.usersList
    

  const filteredUsers = usersList.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.surname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem' }}>
        <TextField label="Search Users" variant="outlined" fullWidth value={searchQuery} onChange={handleSearchChange} style={{ marginBottom: '1rem' }}/>
      <List>
        {filteredUsers.map((user) => (
          <ListItem key={user.id}>
            <Link to={`/Profile/${user.id}`} style={{ textDecoration: 'none' }}>
              <Typography>
                <strong>{user.username}</strong> - {user.name} {user.surname}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}


export default UsersList