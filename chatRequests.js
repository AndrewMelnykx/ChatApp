import Cookies from 'https://cdn.skypack.dev/js-cookie';
import { elements, textArr } from './constantsForChat.js';
import { render } from './renderForChat.js';
import { scrollToBottom } from './allScroll.js';

function clearPostRequestInput() {
  elements.signUpInput.value = '';
};

async function postRequest(e) {
  e.preventDefault();
  const serverUrl = 'https://edu.strada.one/api/user';
  const userEmail = elements.signUpInput.value ?? 'Error';
  elements.signUpInput.onblur = function() {
   if(!userEmail.includes('@')){
    elements.signUpInput.classList.add('invalid')
    elements.errorDiv.innerHTML = 'Please use correct Email!'
   }
  };
  elements.signUpInput.onfocus = function() {
    if(this.classList.contains('invalid')) {
      this.classList.remove('invalid');
      elements.errorDiv.innerHTML = "";
    }
  };

  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ email: userEmail })
    });
    clearPostRequestInput();
    Cookies.set('userEmail',userEmail,{ expires: 20 });
    if (!response.ok) {
      throw new Error(`Something went wrong! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('We caught your error:', error);
  }
};

async function vereficationRequest() {
  const serverUrl = 'https://edu.strada.one/api/user';
  const token = Cookies.get('token');
  const choosenName = elements.changeNameInput.value ?? 'Unknown';

  try {
    const response = await fetch(serverUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ name: choosenName })
    });
    if (!response.ok) {
      throw new Error(`We lost your name! See status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('We caught your error:', error);
  }
};

async function getMessageFromApi() {
  const serverUrl = 'https://edu.strada.one/api/messages';
  const token = Cookies.get('token');
  
  try {
    const response = await fetch(serverUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    if (!response.ok) {
      throw new Error(`Awkward situation! See status: ${response.status}`);
    }
    const responseData = await response.json();
    localStorage.setItem('allMessages', JSON.stringify(responseData.messages));
    render();
    scrollToBottom();
  } catch (error) {
    console.error('We caught your error:', error);
  }
};
export {clearPostRequestInput,postRequest,vereficationRequest,getMessageFromApi};
