function extractTimeTableData() {
    const rows = document.querySelectorAll('.timeTableRow');
    const timeTableData = [];
  
    rows.forEach(row => {
      const subjectCell = row.querySelector('.timeTableSubject');
      const slot = row.querySelector('.timeTableSlot');
  
      if (subjectCell && slot) {
        const divs = slot.querySelectorAll('div');
  
        const obj = {
          "Subject Name": subjectCell.innerText.trim(),
          lecturerName: divs[0]?.innerText.trim() || "",
          auditory: divs[1]?.innerText.trim() || "",
          date: divs[2]?.innerText.trim() || ""
        };
  
        console.log("Row data:", obj);
        timeTableData.push(obj);
      }
    });
  
    console.log("Final Time Table Data:", timeTableData);
    chrome.runtime.sendMessage({ action: 'timeTableData', data: timeTableData });
    return timeTableData;
  }
  //https://chatgpt.com/c/68dfe8c2-28b4-8328-b34b-ef9961e95540
  // Run the extraction
  extractTimeTableData();
  console.log('Content script loaded and running');
  