const io = require('socket.io')(5000)

var users = {}

console.log('starting.......')

io.on('connection', socket => {
    console.log(users[socket.id]+' is online')
    socket.on('new-msg',msg => {
        socket.broadcast.emit('new-msg',{ 'msg': msg,'name': users[socket.id]})
    })
    socket.on('new-user',msg => {
        users[socket.id]=msg
        socket.broadcast.emit('new-user',msg)
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnect',users[socket.id])
        delete users[socket.id]
    })
})
