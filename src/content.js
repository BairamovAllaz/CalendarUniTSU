function extractTimeTableData() {
  const rows = document.querySelectorAll('.timeTableRow');
  const timeTableData = [];

  rows.forEach(row => {
    const subjectCell = row.querySelector('.timeTableSubject');
    if (!subjectCell) return;
    const subjectName = subjectCell.innerText.trim();

    const slotDivs = row.querySelectorAll('.timeTableSlot');

    slotDivs.forEach(slot => {
      const divs = slot.querySelectorAll('div');
      const obj = {
        "Subject Name": subjectName,  
        lecturerName: divs[0]?.innerText.trim() || "",
        auditory: divs[1]?.innerText.trim() || "",
        date: divs[2]?.innerText.trim() || ""
      };

      console.log("Slot data:", obj);
      timeTableData.push(obj);
    });
  });

  console.log("Final Time Table Data:", timeTableData);
  chrome.runtime.sendMessage({ action: 'timeTableData', data: timeTableData });
  return timeTableData;
}

extractTimeTableData();
console.log('Content script loaded and running');