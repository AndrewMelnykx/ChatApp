import { elements, twentyMsg, updateTwentyMsg } from './constantsForChat.js';
import { render } from './renderForChat.js';

let debounceTimer;
let previousScrollHeight = 0;

function loadWithScroll() {
  if (elements.mainList.scrollTop === 0) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      const originalScrollHeight = elements.mainList.scrollHeight;
      updateTwentyMsg(twentyMsg + 20);
      render();
      const newScrollHeight = elements.mainList.scrollHeight;
      const addedMessagesHeight = newScrollHeight - originalScrollHeight;
      const newTopPosition = elements.mainList.scrollTop + addedMessagesHeight;
      const newScrollTop = newTopPosition - (originalScrollHeight - previousScrollHeight) * 0.05;
      elements.mainList.scrollTop = newScrollTop;
      previousScrollHeight = newScrollHeight;
    }, 400);
  }
};
function scrollToBottom() {
  if (elements.mainList) {
    setTimeout(() => {
      elements.mainList.scrollTop = elements.mainList.scrollHeight;
    }, 0);
  }
};
export {debounceTimer, previousScrollHeight,loadWithScroll,scrollToBottom};
