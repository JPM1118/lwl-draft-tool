/* eslint-disable no-undef */
window.addEventListener("load", function (event) {
  console.log('Hi world!')
  const targetNode = document.querySelector('div.pick > div.playerFName');

  //mutation observer
  const config = { attributes: true, childList: true, subtree: true };
  const callback = () => {
    const firstName = document.querySelector('div.pick > div.playerFName').textContent;
    const lastName = document.querySelector('div.pick > div.playerLName').textContent;
    const position = document.querySelector('div.pick > div.playerPos').textContent;
    const draftingPickString = document.querySelector('#draftBoardHdrInfoContainer > div.draftBoardHdrActive > div.currentPickContainer.infoContainer > div.currentPickHeader.infoHeader > div > span.currentPickNumLabel').textContent;
    draftingPickInt = parseInt(draftingPickString.replace('Pick: ', ''))

    console.log(firstName, lastName, draftingPickInt)

    if (lastName !== 'None') {
      chrome.runtime.sendMessage(
        {
          "data": {
            "pick": draftingPickInt,
            "isSkater": position === 'G' ? false : true,
            "name": `${firstName} ${lastName}`
          }
        }
      )
    }
  }


  const observer = new MutationObserver(callback)

  observer.observe(targetNode, config)
});
