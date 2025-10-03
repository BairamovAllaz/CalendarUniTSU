// function extractTimeTableData() {
//     // Select all <tr> elements with id="timeTableRow"
//     const rows = document.querySelectorAll('.timeTableRow');
//     const timeTableData = [];
  
//     // Loop through each row (<tr>)
//     rows.forEach(row => {
//       const rowData = [];
  
//       // Find all <td> elements with id="timeTableSubject" inside this row
//       const cells = row.querySelectorAll('.timeTableSubject');
  
//       // Loop through each <td> and extract the text content
//       cells.forEach(cell => {
//         const cellText = cell.innerText || cell.textContent;
//         rowData.push(cellText); // Add the text content to rowData
//       });
  
//       // Add the row data to the main timeTableData array
//       timeTableData.push(rowData);
//     });
  
//     // Log the data to check
//     console.log(timeTableData);  // Example output: [['Math', 'Science'], ['English', 'History']]
//     chrome.runtime.sendMessage({ action: 'timeTableData', data: timeTableData });
//     return timeTableData; // Optionally return the data if needed
//   }
  
//   // Call the function to extract the timetable data
//   extractTimeTableData();


console.log('Content script loaded and running');

