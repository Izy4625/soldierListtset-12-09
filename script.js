
 let inpbutton = document.getElementById("inpbutton");

const soldiers = JSON.parse(localStorage.getItem('soldiers')) || []
//  form.addEventListener("submit", function (e) {
//     e.preventDefault();
window.onload = function () {
    // מדפיס בהתחלה על ידי לולאה את המערך ההתחלתי עם ה3 מוצרם
    
    renderSoldiers();
    
  } 
function sortSoldiers(){
    
    let filteredSoldiers = soldiers.sort(soldier.fullname)
}
inpbutton.addEventListener("click", addSoldier);
  
function addSoldier(event) {

    event.preventDefault();
  
   let formvalues = document.getElementsByClassName("forminput");
   let status = document.getElementById("status-select");
 const keys = ["fullname","rank","position","platoon","missiontime"]
  let soldier = {
  
  };
  for(i=0 ; i < formvalues.length; i++){
    soldier[keys[i]] = formvalues[i].value
    if(i === 4)
    {
        formvalues[i].value = 0
    }
    else{
         formvalues[i].value ="";
    }
  }
  let id1 = generateId(3);
  let id2 = generateId(3);
  let id3 = generateId(4);

  soldier["missionid"] = id1;
  soldier["deleteid"] = id2;
  soldier["editid"] = id3;
  soldier["status1"] = status.value;
  status.value = "";
  id1 = "";
  id2 = "";
  id3 = "";
  console.log(soldier)
  soldiers.push(soldier);
  saveSoldiers();
  renderSoldiers();
//   formvalues.value = "";
}
function saveSoldiers() {
    localStorage.setItem("soldiers", JSON.stringify(soldiers));
  }

  function renderSoldiers(filteredSoldiers = soldiers) {
    const tbody = document.querySelector("#soldiertable tbody");
    if (tbody) {
      tbody.textContent = "";
    }
    if(filteredSoldiers == null){
      return
    }
  
    // רץ על כל המשימות
    filteredSoldiers.forEach((soldier) => {
      const tr = document.createElement("tr");
      // יוצר את התא של ה- ID
  
      const nameTd = document.createElement("td");
      nameTd.textContent = soldier.fullname;
      tr.appendChild(nameTd);
  
      // ליצור את התא של ה-טקסט
      const rankTd = document.createElement("td");
      rankTd.textContent = soldier.rank;
      
      tr.appendChild(rankTd);
  
      // רינדור סטטוס
      const positionTd = document.createElement("td");
      positionTd.textContent = soldier.position;
       
      tr.appendChild(positionTd);

      const platoonTd = document.createElement("td");
      platoonTd.textContent = soldier.platoon;
       
      tr.appendChild(platoonTd);

      const statusTd = document.createElement("td");
      statusTd.textContent = soldier.status1;
       
      tr.appendChild(statusTd);
  
  
  
      // להוסיף את הכפתורים
      const actionsTd = document.createElement("td");
  
      // כפתור האם המשימה הושלמה
      const toggleButton = document.createElement("button");
      toggleButton.textContent = "Mission";
    
      toggleButton.setAttribute("id", soldier.missionid);
      console.log(soldier.missionid);
      
      
      toggleButton.onclick = () => toggleMission(soldier.missionid);
      console.log(soldier.missionid);
      actionsTd.appendChild(toggleButton);
  
      // כפתור שעורך את המשימה
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.setAttribute("id", soldier.editid)
      editButton.onclick = () => editTodo(soldier.editid);
      actionsTd.appendChild(editButton);

      // למחוק משימה
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("id", soldier.deleteid)
      deleteButton.onclick = () => deleteSoldier(soldier.deleteid);
      actionsTd.appendChild(deleteButton);
  
      tr.appendChild(actionsTd);
  
      tbody.appendChild(tr);
    });
  }

  function toggleMission(_id){
    let missionButton = document.getElementById(_id);
    const soldier = soldiers.find((sold) => sold.missionid === _id);
    let countdown = soldier.missiontime;
    console.log(_id)

const timer = setInterval(() => {
    if (countdown >= 0) {
        missionButton.textContent = countdown;
        countdown--;
    } else {
        clearInterval(timer);
        missionButton.textContent = 'Mission Completed!';
    }
}, 1000);

  }
  function generateId(length) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz483698765762952690123456789";
  
    // Loop to generate characters for the specified length
    for (let i = 0; i < length; i++) {
      const randomInd = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomInd);
    }
    return result;
  }
  function deleteSoldier(deleteId){
    const index = soldiers.findIndex(element => element.deleteid === deleteId);
  
      if (index !== -1) {
        soldiers.splice(index, 1);
    }
    saveSoldiers();
    renderSoldiers();
  }
  function editSoldier(editId) {
    console.log(editId);
    const newinput = document.getElementById("newsectinput");
    let popup = document.getElementsByClassName("popup")[0];
    const targetObj = todos.find((obj) => obj.id === targetId);
    popup.classList.add("open-popup");
    let button = document.getElementById("newinpbutton");
    button.textContent = "submit";
    button.addEventListener("click", () => {
      
      targetObj.text = newinput.value;
      saveEdit();
    });
  }
  function saveEdit() {
    saveTodos();
    renderSects();
    let popup = document.getElementsByClassName("popup")[0];
    popup.classList.remove("open-popup");
  }