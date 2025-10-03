console.log('Background script is running');

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
  });

  chrome.action.onClicked.addListener((tab) => {
    console.log("Background script detected click!");
  });