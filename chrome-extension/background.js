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

const sendNewPlayers = (data) => {
  let jsonData = JSON.stringify(data)
  console.log(jsonData)
  return fetch('http://localhost:3000/players/refreshPlayerList', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
    .then(res => console.log(res))
    .catch(e => console.error(e))
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request)

    if (request.data) {
      sendNewPlayers(request)
    }
  }
)