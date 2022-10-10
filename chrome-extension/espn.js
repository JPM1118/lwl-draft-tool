/* eslint-disable no-undef */
window.addEventListener("load", function (event) {
  console.log("dom loaded");
  //if this node changes, then callback fires
  setTimeout(function () {
    console.log("checking dom");
    let targetNode = document.querySelector(
      "div.draft-column .pick-history-tables"
    );

    //  document.querySelector("div.draft-column ul.pa3");
    console.log(targetNode);
    //mutation observer
    const config = { attributes: true, childList: true, subtree: true };
    const callback = () => {
      //selectors for relevant player and draft information
      let draftedPlayers = Array.from(
        document.querySelectorAll(
          "div.draft-column .pick-history-tables .fixedDataTableRowLayout_rowWrapper .player-column"
        )
      );

      let playerInfo = draftedPlayers.map((player, index) => {
        const playerNameNode = player.querySelector(
          "div.player-details span.playerinfo__playername a.player-news"
        );
        const playerTeamNode = player.querySelector(
          "div.player-details span.playerinfo__playerteam"
        );
        const playerPosNode = player.querySelector(
          "div.player-details span.playerinfo__playerpos"
        );
        const pickObject = {
          name: playerNameNode.innerText.replace(/[\u23CE].*$/gmu, ""),
          team: playerTeamNode.innerText,
          position: playerPosNode.innerText,
          myPick: player.classList.contains("my-pick"),
        };
        return pickObject;
      });
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
