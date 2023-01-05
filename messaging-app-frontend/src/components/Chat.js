import React,{useState,useEffect} from "react";
import "./Chat.css";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import {Avatar, IconButton} from "@mui/material";
import {AttachFile, MoreVert, SearchOutlined, InsertEmoticon} from "@mui/icons-material";
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';


function Chat(props){

    const [seed, setSeed] = useState("");
    const [input,setInput] = useState("");
    const [{user},dispatch] = useStateValue();

    async function sendMessage(event){
        event.preventDefault();
        await axios.post("/messages/new",{
            message:input,
            name:user.displayName,
            timeStamp:new Date().toUTCString(),
            recieved:true,
        });
        setInput("");
    }

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/
b${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>Lobby</h3>
                    <p> Last Seen at {" "}{props.messages[props.messages.length-1]?.timeStamp}</p>
                </div>                
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {props.messages.map((message,index)=>{
                    return (
                        <p className={`chat_message ${message.name ===user.displayName && "chat_reciever"}`} key={index}>
                            <span className="chat_name">{message.name}</span>
                            {message.message}
                            <span className="chat_timestamp">{message.timeStamp}</span>
                        </p>
                    );
                })}
            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input type="text" placeholder="Type a message" value={input} onChange={e=>setInput(e.target.value)} />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicOutlinedIcon />
            </div>
        </div>
    );
};

export default Chat;