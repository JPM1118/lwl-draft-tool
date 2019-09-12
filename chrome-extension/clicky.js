/* eslint-disable no-undef */

const clicky = () => {

}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "test") {
      console.log(request)
    }
  }
)