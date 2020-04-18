const socket = io('http://localhost:5000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const panelbody = document.getElementById('panel-body')

var name = prompt('What is your name ?')
notifymsgappender('you are connected')
socket.emit('new-user',name)

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('new-msg',messageInput.value)
    selfmsgappender(messageInput.value)
    messageInput.value=''
})

socket.on('new-user',data => {
    notifymsgappender(data+' is connected')
})

socket.on('new-msg',data => {
    newmsgapender(data)
})

socket.on('user-disconnect',data => {
    console.log('hjhjh')
    notifymsgappender(data+' is disconnected')
})

function newmsgapender(msg){
    var msgcot = '<div class="external-msg person-msg"><pic>'+msg.name.toUpperCase().charAt(0)+'</pic><div class="msg-container"><msg class="ext-msg">'+msg.msg+'</msg></div></div>'
    panelbody.innerHTML+=msgcot
}

function selfmsgappender(msg){
    var msgcot = '<div class="internal-msg person-msg"><div class="msg-container"><msg class="int-msg">'+msg+'</msg></div><pic>'+name.toUpperCase().charAt(0)+'</pic></div>'
    panelbody.innerHTML+=msgcot
}

function notifymsgappender(msg){
    var msgcot = '<div class="notify-msg"><i>'+msg+'</i></div>'
    panelbody.innerHTML+=msgcot
}