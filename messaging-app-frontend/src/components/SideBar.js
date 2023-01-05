import React from "react";
import "./SideBar.css";
import SideBarChat from "./SideBarChat";
import {useStateValue} from "./StateProvider";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar , IconButton} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


function SideBar(props){

    const [{user},dispatch] = useStateValue();

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton><IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start a new text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SideBarChat messages={props.messages}/>
                <SideBarChat />
                <SideBarChat />
                <SideBarChat />
                <SideBarChat />
            </div>
        </div>
    );
};

export default SideBar;