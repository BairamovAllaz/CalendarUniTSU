let storedTimeTableData = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'timeTableData') {
    storedTimeTableData = message.data;
    console.log('Background received timetable data:', storedTimeTableData);
  }
});