// An array of all slots with their id, hour-mark and data.
//Initially the data field is empty. It will be populated when the user adds notes or reminders.
var slots = [
  {
    id: "0",
    time: "09",
    data: "",
  },
  {
    id: "1",
    time: "10",
    data: "",
  },
  {
    id: "2",
    time: "11",
    data: "",
  },
  {
    id: "3",
    time: "12",
    data: "",
  },
  {
    id: "4",
    time: "13",
    data: "",
  },
  {
    id: "5",
    time: "14",
    data: "",
  },
  {
    id: "6",
    time: "15",
    data: "",
  },
  {
    id: "7",
    time: "16",
    data: "",
  },
  {
    id: "8",
    time: "17",
    data: "",
  },
];

//This function gets the current date using moment library and displays it on the page
function getDay() {
  var currentDay = document.getElementById("currentDay");
  currentDay.innerHTML = moment().format("dddd, MMMM Do");
}

//This function saves the data into the localstorage. Basically, it saves the slots array into localstorage
function saveData() {
  localStorage.setItem("slots", JSON.stringify(slots));
}

//This function gets the saved data from the localstorage and displys it in the respective slots
function displayData() {
  for (let i = 0; i < slots.length; i++) {
    document.getElementById(slots[i].id).innerHTML = slots[i].data;
  }
}

// This function is invoked on page load and it check whether data already exists in local storage. If yes, then it invokes saveData and displayData functions.
function start() {
  var savedSlots = JSON.parse(localStorage.getItem("slots"));
  if (savedSlots) {
    slots = savedSlots;
  }
  saveData();
  displayData();
}
//This function updates the slots array and then invokes the saveData and displayData functions.
function updateSlot(btn) {
  var index = btn.previousSibling.firstChild.id;
  slots[index].data = btn.previousSibling.firstChild.value;
  console.log(slots[0].data);
  saveData();
  displayData();
}

// This function is used to create the actual daily planner elements on the page for the user to interact with.
function create() {
  var main = document.getElementById("container"); //Main container div with which all elements will be appended to
  for (let i = 0; i < slots.length; i++) {
    var slotRow = document.createElement("div");
    slotRow.setAttribute("class", "row");
    main.append(slotRow);
    var slotTime = document.createElement("div");
    slotTime.setAttribute("class", "col-md-2 hour");
    //checks the time attribute and computes a value for display
    if (slots[i].time < 12) {
      slotTime.innerHTML = slots[i].time + " AM";
    } else if (slots[i].time == 12) {
      slotTime.innerHTML = slots[i].time + " PM";
    } else {
      slotTime.innerHTML = slots[i].time - 12 + " PM";
    }

    var slotDiv = document.createElement("div");
    slotDiv.setAttribute("class", "col-md-9 description p-0");
    var slotData = document.createElement("textarea");
    slotData.setAttribute("id", slots[i].id);
    slotDiv.append(slotData);
    //Checks the time attribute and sees if the time is in past, present or future.
    if (slots[i].time < moment().format("HH")) {
      slotData.setAttribute("class", "past");
    } else if (slots[i].time === moment().format("HH")) {
      slotData.setAttribute("class", "present");
    } else if (slots[i].time > moment().format("HH")) {
      slotData.setAttribute("class", "future");
    }

    var saveBtn = document.createElement("button");
    saveBtn.setAttribute("class", "col-md-1 saveBtn");
    saveBtn.onclick = function () {
      updateSlot(this);
    };
    var saveIcon = document.createElement("i");
    saveIcon.setAttribute("class", "fas fa-save fa-lg");
    saveBtn.append(saveIcon);
    slotRow.append(slotTime, slotDiv, saveBtn);
  }
}
