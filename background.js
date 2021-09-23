chrome.action.onClicked.addListener(tab => {
    console.log("clicked!");
    chrome.tabs.sendMessage(tab.id, {});
});
