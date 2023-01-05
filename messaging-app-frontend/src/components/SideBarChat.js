import React,{useEffect,useState} from "react";
import "./SideBarChat.css";
import { Avatar } from "@mui/material";

function SideBarChat(props){

    const [seed, setSeed] = useState("");

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    return (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/ 
b${seed}.svg`} />
            <div className="sidebarChat_info">
                <h2>Lobby</h2>
                <p>{props.messages && props.messages[props.messages.length -1]?.message}</p>
            </div>
        </div>
    );
};

export default SideBarChat;