import { elements,textArr } from "./constantsForChat.js";
import  Cookies from 'https://cdn.skypack.dev/js-cookie'
function changeBackgroudOfAttached(e) {
    const divOfMessage = e.target.closest('.anotherText');
    divOfMessage.classList.add('newBackground');
};
function attachBtnListeners() {
    elements.mainList.addEventListener('mouseover', (e) => {
        const hoveredMsg = e.target.closest('.anotherText');
        if (hoveredMsg) {
            const attachBtn = hoveredMsg.querySelector('.attachBtn');
            if (attachBtn) {
                attachBtn.style.display = 'block';
            }
        }
    });

    elements.mainList.addEventListener('mouseout', (e) => {
        const hoveredMsg = e.target.closest('.anotherText');
        if (hoveredMsg) {
            const attachBtn = hoveredMsg.querySelector('.attachBtn');
            if (attachBtn) {
                attachBtn.style.display = 'none';
            }
        }
    });

    elements.mainList.addEventListener('click', (e) => {
        const clickOnAttachBtn = e.target.closest('.attachBtn');
        if (clickOnAttachBtn) {
            const listItem = e.target.closest('.anotherText');
            if (listItem) {
                const messageIDelem = listItem.querySelector('.messageID');
                if (messageIDelem) {
                    const getStringID = messageIDelem.textContent.trim();
                    if (getStringID) {
                        attachMessageById(getStringID);
                        changeBackgroudOfAttached(e);
                    }
                }
            }
        }
    });

    window.addEventListener('load',()=>{
        const previouslyAttachedMessage = localStorage.getItem('attachedMessage');
        const previouslyAttachedNickName = localStorage.getItem('attachedMessageNickName');
        const previouslyAttachedID = localStorage.getItem('attachedMessageID')
        if (previouslyAttachedMessage){
            createDivElment(previouslyAttachedMessage, previouslyAttachedNickName,previouslyAttachedID);
            attachBtnListeners();
            const allMessages = JSON.parse(localStorage.getItem('allMessages'));
            console.log(allMessages);
        }
    });
};

function createDivElment(messageText,messageNickName,ID) {
    const alreadyIsAttached = document.querySelector('.attachedDiv');
    if (alreadyIsAttached) {
        alert('Your storage is full!');
        return;
    };

    const maxMessageLength = 9;
    const attachedDiv = document.createElement('div');
    attachedDiv.setAttribute('class', 'attachedDiv');

    localStorage.setItem('attachedMessage', messageText);
    localStorage.setItem('attachedMessageNickName', messageNickName);
    localStorage.setItem('attachedMessageID',ID)

    const closeBtnForAttachDiv = document.createElement('button');
    closeBtnForAttachDiv.textContent = 'x';
    closeBtnForAttachDiv.addEventListener('click', () => {
        attachedDiv.remove();
        localStorage.removeItem('attachedMessage');
        localStorage.removeItem('attachedMessageNickName');
        localStorage.removeItem('attachedMessageID')
    });

    const attachedMessage = document.createElement('p');
    let shrinkedMessage = messageText;

    if (shrinkedMessage.length > maxMessageLength) {
        shrinkedMessage = messageText.substring(0, maxMessageLength) + '...';
    }
    attachedMessage.textContent = `${messageNickName}:`+ shrinkedMessage;
    attachedMessage.classList.add('attachedMessage');
    const attachedMessageID = document.createElement('p');
    attachedMessageID.textContent = ID;
    attachedMessageID.setAttribute('class','messageIDFromAttached');
    document.body.addEventListener('click', (e) => {
        const attachedMessage = e.target.closest('.attachedDiv');
        if (attachedMessage) {
            const attachedMessageID = attachedMessage.querySelector('.messageIDFromAttached').textContent.trim();
            const originalMessages = document.querySelectorAll('.messageID');
            originalMessages.forEach(originalMessage => {
                if (originalMessage.textContent.trim() === attachedMessageID) {
                    originalMessage.closest('.anotherText').classList.add('newBackground')
                    originalMessage.closest('.anotherText').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
    attachedDiv.dataset.messageText = messageText;
    attachedDiv.appendChild(closeBtnForAttachDiv);
    attachedDiv.appendChild(attachedMessageID);
    attachedDiv.append(attachedMessage);
    document.body.appendChild(attachedDiv);
    
};

function attachMessageById(messageId) {
    const messages = JSON.parse(localStorage.getItem('allMessages'));

    if (messages) {
        const message = messages.find(msg => msg._id === messageId);
        if (message) {
            console.log('Slected messagecha:', message);
            createDivElment(message.text,message.user.name,message._id);
        } else {
            console.error('There`s no message with ID:', messageId);
        }
    }
};
export { attachBtnListeners, createDivElment,attachMessageById };
