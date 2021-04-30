import React, {useState,useEffect} from 'react';
import './Sidebar.css';
import {Avatar, IconButton, Tooltip} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar(props) {

    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();

    function logout(){ 
        window.location.href = 'https://chat-us-2021.netlify.app/';
    }

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");

        if(roomName){
            // Databse things willl come
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )

            ))
        ));

        return () => {
            unsubscribe();
        }
    },[]); 

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                <Tooltip title="New Chat">
                        <IconButton onClick={createChat}> <ChatIcon /> </IconButton>
                    </Tooltip>
                    <Tooltip title="Log Out">
                    <IconButton onClick={logout}> <ExitToAppIcon /> </IconButton>                   
                    </Tooltip>
                    
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map(room=> (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;