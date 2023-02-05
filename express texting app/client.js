const socket = io("http://localhost:3000");

const messageForm = document.getElementById("f");
const messageBox = document.getElementById("msg-box");
const messageInput = document.getElementById("msg-input");
const userList = document.getElementById("user-list");

const id = prompt("get name");
const room = "random";

socket.emit("new-user",{id : id , room : room});

socket.on("new-user",(data)=> {
    notify = document.createElement("div");
    notify.className = "alert";
    notify.innerText = data.id+" joined the room";
    messageBox.append(notify);
    updateList(data.list);
});

socket.on("user-exit",data => {
    notify = document.createElement("div");
    notify.className = "alert";
    notify.innerText = data.id+" left the room";
    messageBox.append(notify);
    updateList(data.list);
});

socket.on("chat-msg",data => {
    addMsgToBox(data);
});

const addMsgToBox = (msg) =>{
    if(msg.id != id){

        u = document.createElement("div");
        u.className="name";
        u.innerText=msg.id;
        messageBox.append(u);
    }
    msg_container = document.createElement("div");
    if(msg.id == id) msg_container.className = "msg-container user-msg";
    else msg_container.className = "msg-container friend-msg";
    
    text = document.createElement("div");
    text.className="msg";
    text.innerText = msg.message;
    msg_container.append(text);
    
    messageBox.append(msg_container);
    windows.scroll({top:40});
}

messageForm.addEventListener("submit", e => {
    if(messageInput.value != ""){
        e.preventDefault();
        socket.emit("send-msg",{message : messageInput.value,id : id});
        messageInput.value = "";
    }
});


const updateList = list =>{
    userList.innerHTML = "";
    list.forEach(element => {
        a = document.createElement("li");
        a.innerText = element.id;
        userList.append(a);
    });
}




