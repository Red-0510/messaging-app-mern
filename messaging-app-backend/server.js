import express from "express";
import mongoose from "mongoose";
import Messages from "./dbmessages.js";
import Cors from "cors";
import Pusher from "pusher";
import dotenv from "dotenv";
dotenv.config();

//App Config
const app = express();
const port = process.env.PORT || 9000;
const conectionURL = process.env.MONGO_CONNECTION_URL;
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  });

//Middleware
app.use(express.json());
app.use(Cors());


//DB Config
mongoose.set("strictQuery",false);
mongoose.connect(conectionURL,{
    useNewUrlParser:true,
})

const db=mongoose.connection;
// this executes only once when the open event occurs for the Database
db.once("open",()=>{
    console.log("DB Connected");
    const msgCollection = db.collection("messagingmessages");
    const changeStream = msgCollection.watch();
    changeStream.on('change', (change)=>{
        console.log(change);
        if(change.operationType==="insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",{
                name:messageDetails.name,
                message:messageDetails.message,
                timeStamp:messageDetails.timeStamp,
                recieved:messageDetails.recieved
            });
        }
        else{
            console.log("Error triggering Pusher");
        }
    });
})

//API ENdpoints
//Get Requests
app.get("/",(req,res)=>{
    res.status(200).send("Server spinning");
});

app.get("/messages/sync",(req,res)=>{
    Messages.find({},(err,data)=>{
        if(err)res.status(500).send(err);
        else res.status(200).send(data);
    });
});

//POst requests
app.post("/messages/new",(req,res)=>{
    const dbMessage = req.body;
    Messages.create(dbMessage,(err,data)=>{
        if(err) res.status(500).send(err);
        else res.status(201).send(data);
    });
});

// Listening
app.listen(port,()=>console.log(`Server is Listening at localhost:${port}`));
