const io = require("socket.io")(3000, {
    cors: {
        origin: "http://localhost:5173"
    }
})

const activeUser = [];

io.on("connection", (socket) => {
    socket.on("new-user-add", (newUserId)=>{
        if(!activeUser.some(user => user.userId === newUserId)){
            activeUser.push( {userId: newUserId, socketId: socket.id} );
            console.log("New user added: ", activeUser)
        }
        io.emit("get-users", activeUser);
    })

    socket.on("disconnect", ()=>{
        activeUser = activeUser.filter(user => user.socketId !== socket.id);
        console.log("User disconnected: ", activeUser)
        io.emit("get-users", activeUser);
    })

    socket.on("send-message", (data)=>{
        const { recieverId } = data;
        const user = activeUser.find(user => user.userId === recieverId);
        console.log("Sending from socket to :", receiverId)
        console.log("Data: ", data)
        if(user){
            io.to(user.socketId).emit("recieve-message", data);
        }
    })
})