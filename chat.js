// import{ }from './chatCookie.js '
import Cookies from 'https://cdn.skypack.dev/js-cookie';
import { elements } from './constantsForChat.js';
import { render, deleteAll, getFormattedTime, cloneMessage, clearValue } from './renderForChat.js';
import { clearPostRequestInput, getMessageFromApi, vereficationRequest, postRequest } from './chatRequests.js';
import { socketConnection, socket } from "./chatWebSocket.js";
import { loadWithScroll, debounceTimer, previousScrollHeight, scrollToBottom } from "./allScroll.js";
import { attachBtnListeners ,createDivElment,attachMessageById} from "./chatAttach.js";
if (elements.signInBtn) {
    elements.signInBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const codeFromEmail = elements.verifyInput.value;
        Cookies.set('token', codeFromEmail, { expires: 30 });
    });
};

if (elements.signInBtn) {
    elements.signInBtn.addEventListener('click', function (e) {
        if (elements.verifyPopup) {
            elements.verifyPopup.close();
        }
        e.preventDefault();
        elements.popupDialog.showModal();
    });

};
attachBtnListeners()
if (elements.popupSentBtn) {
    elements.popupSentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        vereficationRequest();
    });
};

if (elements.verifyBtn) {
    elements.verifyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (elements.verifyPopup) {
            elements.verifyPopup.showModal();
            if (elements.popupSignUp) {
                elements.popupSignUp.close()
            }
        }
    });
};
if (elements.btnSettings) {
    elements.btnSettings.addEventListener('click', function () {
        if (elements.popupDialog) {
            elements.popupDialog.showModal();
        }

    });
};

if (elements.closeDialogBtn) {
    elements.closeDialogBtn.addEventListener('click', function () {
        if (elements.popupDialog) {
            elements.popupDialog.close();
        }

    });
};

if (window) {
    window.addEventListener('load', function () {
        if (elements.popupSignUp) {
            elements.popupSignUp.showModal();
        }
    });
};
if (elements.closeverifyBtn) {
    elements.closeverifyBtn.addEventListener('click', function () {
        if (elements.verifyPopup) {
            elements.verifyPopup.close();
        }
    })
};

if (elements.closeSignUpBtn) {
    elements.closeSignUpBtn.addEventListener('click', function () {
        if (elements.popupSignUp) {
            elements.popupSignUp.close();
        }

    });
};
if (elements.sentCodeBtn) {
    elements.sentCodeBtn.addEventListener('click', postRequest);

};

if (window) {
    window.addEventListener('load', () => {
        getMessageFromApi()

    })
};

window.addEventListener("load", () => {
    socketConnection()
});

if (elements.formInput) {
    elements.formInput.addEventListener('submit', function (e) {
        e.preventDefault();
        const inputText = elements.mainInput.value.trim();
        if (inputText) {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ text: inputText }));
            } else {
                console.error('WebSocket connection is not open.');
            }
        } else {
            alert('Write down anything!');
        }
    });
};
// const scrollBarLoading = elements.mainList.addEventListener('scroll', loadWithScroll);

