/* eslint-disable no-undef */
window.addEventListener('load', function (event) {
  console.log('dom loaded');
  //if this node changes, then callback fires
  setTimeout(function () {
    console.log('checking dom');
    let targetNode = document.querySelector('div.draft-column ul.pa3');

    //  document.querySelector("div.draft-column ul.pa3");
    console.log(targetNode);
    //mutation observer
    const config = { attributes: true, childList: true, subtree: true };
    const callback = () => {
      //selectors for relevant player and draft information
      let draftedPlayers = Array.from(
        document.querySelectorAll(
          'div.draft-column ul.pa3 div.pick__message-information'
        )
      );

      let playerInfo = draftedPlayers.map((player, index) => ({
        name: player.childNodes[0].innerText.replace(/[\u23CE].*$/gmu, ''),
        team: player.childNodes[2].innerText,
        position: player.childNodes[4].innerText,
        pick: index + 1,
      }));
      console.log(playerInfo);
      chrome.runtime.sendMessage({
        data: playerInfo,
      });
    };

    let observer = new MutationObserver(callback);
    if (targetNode) {
      observer.observe(targetNode, config);
    }
  }, 3000);
});
