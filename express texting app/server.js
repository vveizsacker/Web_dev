const express = require("express");
const app = express();
const mongoose = require("mongoose");

const io = require("socket.io")(3000, {cors: {origin: "*"}});

const Room = require("./room");
mongoose.connect("mongodb://127.0.0.1:27017/text-app",()=> console.log("CONNECTED"));

joinRoom = async (username,roomId) =>{
    const room = await Room.findOne({roomid : roomId});
    room['users'].push(username);
    console.log(room);
    await Room.findOneAndUpdate({roomid : roomId},room);
}

leaveRoom = async (username,roomId) =>{

}

createRoom = async(roomName,username) =>{

}

io.on("connection",socket => {

    socket.on("send-msg" , msg => {
        socket.emit("chat-msg",msg);
        socket.broadcast.emit("chat-msg",msg);
    });

    socket.on("new-user" ,data => {
        socket.emit("new-user",{data:data});
        socket.broadcast.emit("new-user",{data:data});
    });

    socket.on("disconnect",() =>{
        /*
        for( var i = 0; i < list.length; i++){                       
            if ( list[i].socketid === socket.id ) { 
                dis = list[i].id;
                list.splice(i, 1); 
                i--; 
            }
        }
        socket.broadcast.emit("user-exit",{list:list,id:dis});
        */
    })
});


app.set("view engine","ejs");
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res) => {
    res.render("index");
});

app.get("/home",(req,res)=>{
    res.render("home");
});

app.get("/room/:id",(req,res)=>{
    //get room data from db
    //render data in template chat-room name, users list, last 30 messages
});

app.post("/join/:id",(req,res)=>{
    roomid = req.params.id;

});

app.post("/createuser",(req,res) =>{
    //check username if exist in db
    //create user
});

app.post("/login",(req,res)=>{
    //check username if exist in db
    //login user and create session
    //go to home page
});

app.post("/createroom",(req,res)=>{
    //get room data + creator
    //save in db
});

app.listen(8080);