/* eslint-disable no-undef */
window.addEventListener("load", function (event) {
  //if this node changes, then callback fires
  const targetNode = document.querySelector('div.pick > div.playerFName');

  //mutation observer
  const config = { attributes: true, childList: true, subtree: true };
  const callback = () => {
    //selectors for relevant player and draft information
    const firstName = document.querySelector('div.pick > div.playerFName').textContent;
    const lastName = document.querySelector('div.pick > div.playerLName').textContent;
    const position = document.querySelector('div.pick > div.playerPos').textContent;
    const draftingPickString = document.querySelector('#draftBoardHdrInfoContainer > div.draftBoardHdrActive > div.currentPickContainer.infoContainer > div.currentPickHeader.infoHeader > div > span.currentPickNumLabel').textContent;
    const draftingPickInt = parseInt(draftingPickString.replace('Pick: ', '')) - 1
    const totalPlayersDrafted = Array.from(document.querySelectorAll('.playerPicked')).length

    chrome.runtime.sendMessage(
      {
        "data": {
          "pick": draftingPickInt,
          "position": position === 'G' ? 'goalies' : 'skaters',
          "name": `${firstName} ${lastName}`,
          "totalPlayersDrafted": totalPlayersDrafted
        }
      }
    )
  }


  const observer = new MutationObserver(callback)

  observer.observe(targetNode, config)
});
