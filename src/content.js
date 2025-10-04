const timeTableData = [];
function extractTimeTableData() {
  const rows = document.querySelectorAll('.timeTableRow');

  rows.forEach(row => {
    const subjectCell = row.querySelector('.timeTableSubject');
    if (!subjectCell) return;
    const subjectName = subjectCell.innerText.trim();

    const slotDivs = row.querySelectorAll('.timeTableSlot');

    slotDivs.forEach(slot => {
      const divs = slot.querySelectorAll('div');
      const obj = {
        SubjectName: subjectName,  
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
  clearAllTbody();
  return timeTableData;
}

function clearAllTbody() {
  document.querySelectorAll("tbody").forEach(tbody => {
    tbody.innerHTML = "";
  });
}

function createCircularDaySelector() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const container = document.createElement("div");
  container.id = "circular-day-selector";
  container.style.position = "fixed";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.width = "220px";
  container.style.height = "220px";
  container.style.borderRadius = "50%";
  container.style.border = "2px solid #333";
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.zIndex = "9999";
  container.style.background = "#fff";
  container.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  document.body.appendChild(container);

  const infoDiv = document.createElement("div");
  infoDiv.style.position = "fixed";
  infoDiv.style.bottom = "10px";
  infoDiv.style.left = "50%";
  infoDiv.style.transform = "translateX(-50%)";
  infoDiv.style.padding = "12px 24px";
  infoDiv.style.background = "#4a90e2";
  infoDiv.style.width = "300px";
  infoDiv.style.height = "auto";
  infoDiv.style.minHeight = "60px";
  infoDiv.style.color = "white";
  infoDiv.style.borderRadius = "25px";
  infoDiv.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  infoDiv.style.textAlign = "center";
  infoDiv.style.zIndex = "9998";
  infoDiv.style.fontFamily = "Arial, sans-serif";
  infoDiv.style.fontSize = "14px";
  infoDiv.style.fontWeight = "bold";
  infoDiv.innerText = "Select a day to view schedule";
  document.body.appendChild(infoDiv);

  const centerX = 110;
  const centerY = 110;
  const radius = 80;
  let selectedDay = null;

  days.forEach((day, i) => {
    const angle = (i / days.length) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle) - 20;
    const y = centerY + radius * Math.sin(angle) - 20;

    const btn = document.createElement("div");
    btn.innerText = day;
    btn.style.position = "absolute";
    btn.style.width = "40px";
    btn.style.height = "40px";
    btn.style.lineHeight = "40px";
    btn.style.textAlign = "center";
    btn.style.borderRadius = "50%";
    btn.style.background = "#f0f0f0";
    btn.style.cursor = "pointer";
    btn.style.userSelect = "none";
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
    btn.style.border = "1px solid #333";
    btn.style.transition = "0.2s";

    btn.addEventListener("click", () => {
      selectedDay = day;
      document.querySelectorAll("#circular-day-selector div").forEach(d => {
        d.style.background = "#f0f0f0";
        d.style.color = "#000";
      });
      btn.style.background = "#007bff";
      btn.style.color = "#fff";

      if(day == "Mon") {
        day = "ორშაბათი";
      }else if(day == "Tue") {
        day = "სამშაბათი";
      }else if(day == "Wed") {
        day = "ოთხშაბათი";
      }else if(day == "Thu") {
        day = "ხუთშაბათი";
      }else if(day == "Fri") {
        day = "პარასკევი";
      }else if(day == "Sat") {
        day = "შაბათი";
      }else if(day == "Sun") {
        day = "კვირა";
      }

      const filtered = timeTableData.filter(slot => slot.date.includes(day));
      if (filtered.length > 0) {
        infoDiv.innerHTML = filtered.map(s => `${s.SubjectName} (${s.lecturerName})`).join("<br>");
      } else {
        infoDiv.innerText = `No classes on ${day}`;
      }

      console.log("Selected day:", selectedDay, filtered);
    });
    container.appendChild(btn);
  });
}

window.addEventListener("load", () => {
  console.log("Page loaded");
  extractTimeTableData();
  createCircularDaySelector();
});
