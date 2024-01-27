import { Link } from "react-router-dom"
import { User } from "../../types/user"
import UserC from "./UserC"
import { List, ListItem, Paper, Typography } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';

function UsersList(props: {usersList: User[]}) {

  const usersList = props.usersList
    
  return (
    <Paper elevation={3} style={{ padding: '1rem' }}>
      <List>
        {usersList.map((user) => (
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