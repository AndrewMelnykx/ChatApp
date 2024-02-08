import Cookies from 'https://cdn.skypack.dev/js-cookie';
import { elements } from './constantsForChat.js';
import { render, deleteAll, getFormattedTime, cloneMessage, clearValue } from './renderForChat.js';
import { scrollToBottom } from './allScroll.js';

let socket;
const myEmail = Cookies.get('userEmail');

function socketConnection() {
  const token = Cookies.get('token');
  socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);

  socket.onopen = function () {
    console.log('WebSocket connection opened');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);

    clearValue();
    const messageForSocket = cloneMessage();
    console.log(messageForSocket);
    const messageText = messageForSocket.querySelector('.messageText');
    const time = messageForSocket.querySelector('.time');
    const nickName = messageForSocket.querySelector('.nickName');

    if (messageForSocket && messageText && time && nickName) {
        messageText.textContent = data.text;
        time.textContent = getFormattedTime(data.createdAt);
        nickName.textContent = data.user.name;

        if (data.user.email !== myEmail) {
            messageForSocket.classList.add('anotherText');
            messageForSocket.classList.remove('text');
        }

        if (elements.mainList) {
            elements.mainList.append(messageForSocket);
        }
        scrollToBottom();
    } else {
        console.error('One of the required elements is null.');
    }
};

  socket.onclose = function () {
    console.log('WebSocket connection closed');
    setTimeout(socketConnection, 5000);
  };
};

export {socket,socketConnection};
