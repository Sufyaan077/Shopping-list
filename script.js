// ===== Persistent state =====
let shoppinglist = JSON.parse(localStorage.getItem("shoppinglist")) || [];

// ===== DOM elements =====
const inputEl   = document.getElementById("shoppinglistInput");
const listEl    = document.getElementById("shoppingList");
const countEl   = document.getElementById("shoppinglistCount");
const addBtn    = document.getElementById("addButton");
const delAllBtn = document.getElementById("deleteButton");

// ===== Helpers =====
function save() {
  localStorage.setItem("shoppinglist", JSON.stringify(shoppinglist));
}

function updateCount() {
  countEl.textContent = shoppinglist.length;
}

function render() {
  listEl.innerHTML = "";
  shoppinglist.forEach((item, index) => {
    // Card container
    const row = document.createElement("p");
    if (item.disabled) row.classList.add("disabled");

    // Checkbox
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!item.disabled;

    // Text span (keeps it beside the checkbox)
    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = item.text;

    // Events
    cb.addEventListener("change", () => {
      shoppinglist[index].disabled = cb.checked;
      save();
      render(); // re-render to update class + count
    });

    row.append(cb, span);
    listEl.appendChild(row);
  });

  updateCount();
}

function addItem() {
  const text = (inputEl.value || "").trim();
  if (!text) return;
  shoppinglist.push({ text, disabled: false });
  inputEl.value = "";
  save();
  render();
}

function deleteAll() {
  shoppinglist = [];
  save();
  render();
}

// ===== Wire up =====
addBtn.addEventListener("click", addItem);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addItem();
});
delAllBtn.addEventListener("click", deleteAll);

// Initial render
render();
