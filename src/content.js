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

function clearAllTbody() { //refactor this code 
  document.querySelectorAll("tbody").forEach(tbody => {
    tbody.innerHTML = "";
  });
  document.querySelectorAll(".table").forEach(tb => { 
    tb.innerHTML = "";
  })
  document.querySelectorAll("mat-radio-group").forEach(tb => { 
    tb.innerHTML = "";
  })

  document.querySelectorAll(".paddinPageHeader").forEach(tb => { 
    tb.innerHTML = "";
  })
}

function createCircularDaySelector() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const container = document.createElement("div");
  container.id = "circular-day-selector";
  container.style.position = "fixed";
  container.style.top = "30%";
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
  infoDiv.style.bottom = "20px";
  infoDiv.style.left = "50%";
  infoDiv.style.transform = "translateX(-50%)";
  infoDiv.style.padding = "15px 20px";
  infoDiv.style.background = "#4a90e2";
  infoDiv.style.width = "320px";
  infoDiv.style.maxHeight = "400px";
  infoDiv.style.minHeight = "400px";
  infoDiv.style.overflowY = "auto";
  infoDiv.style.color = "white";
  infoDiv.style.borderRadius = "15px";
  infoDiv.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
  infoDiv.style.textAlign = "center";
  infoDiv.style.zIndex = "9998";
  infoDiv.style.fontFamily = "Arial, sans-serif";
  infoDiv.style.fontSize = "14px";
  infoDiv.style.fontWeight = "500";
  infoDiv.style.scrollbarWidth = "thin";
  infoDiv.style.scrollbarColor = "rgba(255,255,255,0.3) transparent";
  infoDiv.style.overscrollBehavior = "contain";
  infoDiv.innerText = "Select a day to view schedule";
  
  // Custom scrollbar for WebKit browsers
  const style = document.createElement('style');
  style.textContent = `
    #${infoDiv.id}::-webkit-scrollbar {
      width: 6px;
    }
    #${infoDiv.id}::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 3px;
    }
    #${infoDiv.id}::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
    }
  `;
  document.head.appendChild(style);
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
      }
      const filtered = timeTableData.filter(slot => slot.date.includes(day));
      infoDiv.innerHTML = ''; // Clear previous content
      
      if (filtered.length > 0) {
        filtered.forEach(slot => {
          const classDiv = document.createElement('div');
          classDiv.style.background = 'rgba(255, 255, 255, 0.15)';
          classDiv.style.padding = '12px';
          classDiv.style.margin = '8px 0';
          classDiv.style.borderRadius = '8px';
          classDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          
          const subject = document.createElement('div');
          subject.textContent = slot.SubjectName || 'No subject';
          subject.style.fontWeight = 'bold';
          subject.style.marginBottom = '6px';
          
          const lecturer = document.createElement('div');
          lecturer.textContent = `Lecturer: ${slot.lecturerName || 'N/A'}`;
          lecturer.style.fontSize = '0.9em';
          lecturer.style.opacity = '0.9';
          lecturer.style.marginBottom = '4px';
          
          const room = document.createElement('div');
          room.textContent = `Room: ${slot.auditory || 'N/A'}`;
          room.style.fontSize = '0.9em';
          room.style.opacity = '0.9';
          
          classDiv.appendChild(subject);
          classDiv.appendChild(lecturer);
          classDiv.appendChild(room);
          infoDiv.appendChild(classDiv);
        });
      }else {
        const noClasses = document.createElement('div');
        noClasses.textContent = `No classes on ${day}`;
        noClasses.style.padding = '12px';
        noClasses.style.textAlign = 'center';
        noClasses.style.opacity = '0.8';
        infoDiv.appendChild(noClasses);
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
