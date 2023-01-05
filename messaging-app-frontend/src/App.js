import dotenv from "dotenv";
import React,{useEffect,useState} from 'react';
import './App.css';
import Pusher from "pusher-js";
import axios from "./components/axios";
import SideBar from "./components/SideBar";
import Chat from './components/Chat';
import {useStateValue} from "./components/StateProvider";

import Login from "./components/login";
dotenv.config();

function App() {

  const [messages,setMessages] = useState([]);
  const [{user},dispatch] = useStateValue();

  // second argument is condition if it changes then useEffect is called here it is empty array hence it under lying code is executed only once upon refresh
  useEffect(()=>{
    axios.get("/messages/sync").then(res=>{setMessages(res.data)});
  },[]);
  // condition is messages state variable if it changes this hook is called
  useEffect(()=>{
    console.log(process.env.REACT_APP_PUSHER_API_KEY);
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_API_KEY,{cluster:process.env.REACT_APP_PUSHER_CLUSTER});
    const channel = pusher.subscribe("messages");
    channel.bind("inserted",(data)=>{
      setMessages([...messages,data]);
    });

    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);
  

  // this is pinging the mongo DB server for whenver the messages dependency changes 
  //issue: this local message variable not change when someone other send the message
  // useEffect(()=>{
  //   console.log("my version pinging");
  //   console.log(messages);
  //   axios.get("/messages/sync").then(res=>{
  //     if(messages!=res.data) return;
  //     else setMessages(res.data);
  //   });
  //   // return;
  // },[messages]);

  // console.log(messages);

  return (
    <div className="app">
      { !user ? <Login /> :(
        <div className="app_body">
          <SideBar messages={messages}/>
          <Chat messages={messages}/>
        </div>
      )}
    </div>
  );
}

export default App;
