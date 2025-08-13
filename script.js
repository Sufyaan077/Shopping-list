// Retrieve shopping list from local storage or initialize an empty array

let shoppinglist = JSON.parse(localStorage.getItem("shoppinglist") || "[]");
const shoppinglistInput = document.getElementById("shoppinglistInput");
const shoppingList = document.getElementById("shoppingList");
const shoppinglistCount = document.getElementById("shoppinglistCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask) ;
    shoppinglistInput.addEventListener("keydown", function (event) {
       if (event.key === "Enter") {
        event.preventDefault();
        addTask();
       }
     });
      deleteButton.addEventListener("click", deleteAllTasks);
      displayTasks();
   });
   




function addTask() {
    const newTask = shoppinglistInput.value.trim();
    if (newTask !== "") {
        shoppinglist.push({
            text: newTask,
            disabled: false,
        });
        saveToLocalStorage();
        shoppinglistInput.value = "";
        displayTasks();
    }
}

function deleteAllTasks() {
    console.log("test");
}

function displayTasks() {
    shoppingList.innerHTML = "";
    shoppinglist.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
          <div class="shoppinglist-container">
          <input type="checkbox" class="shoppinglist-checkbox"
           id="input-${index}" ${
            item.disabled ? "checked" : ""
           }>

           <p id="shoppinglist-${index}" class="${
            item.disabled ? "disabled" : "" 
        }" onclick="editTask(${index})">${item.text}</p>
          </div>

        `;
        p.querySelector(".shoppinglist-checkbox").addEventListener
        ("change", () => 
            toggleTask (index)
        );
        shoppingList.appendChild(p);
      });
      shoppinglistCount.textContent = shoppinglist.length;
}

function editTask(index) {
    const shoppinglistItem = document.getElementById(`shoppinglist-${index}`);
    const existingText = shoppinglist[index.text];
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    shoppinglistItem.replaceWith(inputElement);

    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            shoppinglist[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();

    });
}

function toggleTask(index) {
    shoppinglist[index].disabled = !shoppinglist[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
    shoppinglist=[];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
    localStorage.setItem("shoppinglist",JSON.stringify(shoppinglist));

}

