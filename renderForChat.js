import { elements,twentyMsg } from './constantsForChat.js';
import { scrollToBottom } from './allScroll.js';
import Cookies from 'https://cdn.skypack.dev/js-cookie';
function deleteAll() {
  if (elements.mainList) {
    elements.mainList.innerHTML = '';
  }
};

function getFormattedTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

function render() {
  deleteAll();
  let messagesFromStorage = localStorage.getItem('allMessages');
  let messagesArr = JSON.parse(messagesFromStorage).reverse();
  messagesArr.forEach(function (message) {
    const retrievedMessage = elements.template?.content.cloneNode(true);
    if (retrievedMessage) {
      const myEmail = Cookies.get('userEmail');
      if (message.user && message.user.email === myEmail) {
        var messageText = retrievedMessage.querySelector('.messageText');
        var time = retrievedMessage.querySelector('.time');
        var nickName = retrievedMessage.querySelector('.nickName');
        var messageID = retrievedMessage.querySelector('.messageID');
        if (messageText && time && nickName) {
          messageText.textContent = message.text;
          time.textContent = getFormattedTime(message.createdAt);
          nickName.textContent = `${message.user.name}:`;
          messageID.textContent = message._id;
        }
      } else {
        if (message.user && message.user.name !== myEmail) {
          const oldClass = retrievedMessage.querySelector('.text');
          var messageText = retrievedMessage.querySelector('.messageText');
          var time = retrievedMessage.querySelector('.time');
          var nickName = retrievedMessage.querySelector('.nickName');
          var messageID = retrievedMessage.querySelector('.messageID');
          if (messageText && time && nickName && oldClass) {
            messageText.textContent = message.text;
            messageID.textContent = message._id;
            time.textContent = getFormattedTime(message.createdAt);
            nickName.textContent = `${message.user.name}:`;
            oldClass.classList.add('anotherText');
            oldClass.classList.remove('text');
            
          }
        }
      }
      if (elements.mainList) { elements.mainList.append(retrievedMessage) }
    }
  });
};

function cloneMessage() {
  const input = elements.mainInput.value.trim();
  const clonedContent = elements.template.content.cloneNode(true);
  const li = document.createElement('li');
  li.classList.add('text');
  li.append(clonedContent);

  const messageText = li.querySelector('.messageText');
  if (messageText) {
    messageText.textContent = input;
  };
  scrollToBottom();
  return li;
};

function clearValue() {
  if (elements.mainInput) {
    elements.mainInput.value = '';
  }
};

export {deleteAll,getFormattedTime,render,cloneMessage,clearValue};
