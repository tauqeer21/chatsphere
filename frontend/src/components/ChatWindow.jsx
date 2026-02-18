import { API_URL } from "../config";

import {

useState,
useEffect,
useRef

} from "react";

import axios from "axios";

import { socket }
from "../socket/socket";

import Message from "./Message";


function ChatWindow({

user,
selectedUser

}) {


const [messages, setMessages]
= useState([]);

const [message, setMessage]
= useState("");

const [typingUser, setTypingUser]
= useState(null);


const messagesEndRef
= useRef(null);



const scrollToBottom = () => {

messagesEndRef.current?.
scrollIntoView({

behavior: "smooth"

});

};


useEffect(() => {

scrollToBottom();

}, [messages]);



useEffect(() => {

if (!selectedUser) return;


axios.get(

`${API_URL}/api/messages/${user._id}/${selectedUser._id}`

)

.then(res =>

setMessages(res.data)

);


// SEND SEEN EVENT

socket.emit(

"message_seen",

{

senderId:
selectedUser._id

}

);


}, [selectedUser]);




useEffect(() => {


socket.emit(

"user_connected",

user._id

);


socket.on(

"receive_message",

msg => {

msg.delivered = true;

setMessages(prev =>

[...prev, msg]

);

});


socket.on(

"message_delivered",

(data) => {

setMessages(prev =>

prev.map(msg =>

msg._id === data.messageId

?

{ ...msg, delivered: true }

:

msg

)

);

});


socket.on(

"message_seen",

(data) => {

setMessages(prev =>

prev.map(msg =>

msg._id === data.messageId

?

{ ...msg, seen: true }

:

msg

)

);

});


socket.on(

"typing",

(data) => {

setTypingUser(data.senderId);

setTimeout(

() => setTypingUser(null),

2000

);

});


return () => {

socket.off();

};


}, []);




const sendMessage = () => {


if (!message.trim()) return;


const msg = {

_id: Date.now(),

senderId: user._id,

receiverId:
selectedUser._id,

text: message,

createdAt:
new Date(),

delivered:false,

seen:false

};


socket.emit(

"send_message",

msg

);


axios.post(

`${API_URL}/api/messages/send`,

msg

);


setMessages(

[...messages, msg]

);


setMessage("");

};




const handleTyping =
(value) => {

setMessage(value);

socket.emit(

"typing",

{

senderId: user._id,

receiverId:
selectedUser._id

}

);

};



if (!selectedUser)

return <div className="empty">Select a chat</div>;



return (

<div className="chat-window">


<div className="messages">


{

messages.map(

(msg, index) => (

<Message

key={index}

message={msg}

own={

msg.senderId === user._id

}

/>

))

}


{

typingUser === selectedUser._id && (

<div

style={{

fontSize:"12px",

color:"gray"

}}

>

{selectedUser.username}
is typing...

</div>

)}


<div ref={messagesEndRef}/>


</div>



<div className="input-box">


<input

value={message}

onChange={

e => handleTyping(

e.target.value

)

}

/>


<button

onClick={sendMessage}

>

Send

</button>


</div>


</div>

);

}


export default ChatWindow;
