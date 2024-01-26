import { useDispatch, useSelector } from "react-redux"
import { Invite, InviteStatus } from "../../types/invite"
import { updateInvite } from "../../reducers/invitesReducer"
import { putInvite } from "../../api/invite"
import { addFriend } from "../../reducers/usersReducer"
import { RootState } from "../../store"
import { postUser, putUser } from "../../api/user"
import { User } from "../../types/user"

function InviteList(props: {invites:Invite[]}) {
    const usersAll = useSelector((state: RootState) => state.users).users
    
    const invites:Invite[] = props.invites
    const dispatch = useDispatch()
    const accept = (invite:Invite) => {
        const user1:User = usersAll.find(user => user.id === invite.senderId) as User
        const user2:User = usersAll.find(user => user.id === invite.receiverId) as User
        console.log(user1, user2)
        dispatch(updateInvite({id: invite.id, status: InviteStatus.ACCEPTED}))
        const inviteToSend:Invite = {
            id: invite.id,
            senderId: invite.senderId,
            senderUsername: invite.senderUsername,
            receiverId: invite.receiverId,
            receiverUsername: invite.receiverUsername,
            status: InviteStatus.ACCEPTED
        }
        putInvite(inviteToSend)

        dispatch(addFriend({user1Id: invite.senderId, user2Id: invite.receiverId}))
        const user1ToSend:User = {
            id: user1.id,
            name: user1.name,
            surname: user1.surname,
            email: user1.email,
            friends: [...user1.friends, user2.id],
            username: user1.username,
            password: user1.password,
            phoneNumber: user1.phoneNumber
        }
        const user2ToSend:User = {
            id: user2.id,
            name: user2.name,
            surname: user2.surname,
            email: user2.email,
            friends: [...user2.friends, user1.id],
            username: user2.username,
            password: user2.password,
            phoneNumber: user2.phoneNumber
        }
        putUser(user1ToSend)
        putUser(user2ToSend)
    }

    const decline = (invite:Invite) => {
        const user1:User = usersAll.find(user => user.id === invite.senderId) as User
        const user2:User = usersAll.find(user => user.id === invite.receiverId) as User
        console.log(user1, user2)
        // invite update
        dispatch(updateInvite({id: invite.id, status: InviteStatus.REJECTED}))
        const inviteToSend:Invite = {
            id: invite.id,
            senderId: invite.senderId,
            senderUsername: invite.senderUsername,
            receiverId: invite.receiverId,
            receiverUsername: invite.receiverUsername,
            status: InviteStatus.REJECTED
        }
        putInvite(inviteToSend)
        // users update
        dispatch(addFriend({user1Id: invite.senderId, user2Id: invite.receiverId}))
        const user1ToSend:User = {
            id: user1.id,
            name: user1.name,
            surname: user1.surname,
            email: user1.email,
            friends: user1.friends.filter(friendId => friendId !== user2.id),
            username: user1.username,
            password: user1.password,
            phoneNumber: user1.phoneNumber
        }
        const user2ToSend:User = {
            id: user2.id,
            name: user2.name,
            surname: user2.surname,
            email: user2.email,
            friends: user2.friends.filter(friendId => friendId !== user1.id),
            username: user2.username,
            password: user2.password,
            phoneNumber: user2.phoneNumber
        }
        putUser(user1ToSend)
        putUser(user2ToSend)
    }

    return (
        <div>
            <h1>InviteList</h1>
            {invites.map((invite) => (
                <>
                    <p>{invite.senderUsername}</p>
                    <button onClick={()=>accept(invite)}>Accept</button>
                    <button onClick={()=>decline(invite)}>Decline</button>
                </>
            ))}
        </div>
    )
}

export default InviteList