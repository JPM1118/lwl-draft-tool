
//Only show chrome extension icon when on 'clickydraft' domain
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'clickydraft' },
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

//send draft information to backend
const sendNewPlayers = (data) => {
  let jsonData = JSON.stringify(data)
  return fetch('http://localhost:3000/players/refreshPlayerList', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Cache-Control": "no-store"
    },
    body: jsonData
  })
    .catch(e => console.error(e))
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.data) {
      sendNewPlayers(request)
    }
  }
)