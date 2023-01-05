import mongoose, { Mongoose } from "mongoose";

const messagingSchema = mongoose.Schema({
    message:String,
    name:String,
    timeStamp:String,
    recieved:Boolean
});

export default mongoose.model("messagingmessages",messagingSchema);