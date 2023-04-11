const itemInput = document.querySelector(".add-item-input");
const addBtn = document.querySelector(".add-btn");
const filterInput = document.querySelector(".filter-item-input");
const ul = document.querySelector(".list-items");
const cartForm = document.querySelector("#cart-form");
const wrapper = document.querySelector(".wrapper");

function createIcons(className) {
  let icon = document.createElement("i");
  icon.className = className;
  return icon;
}

function createButton(className) {
  const button = document.createElement("button");
  button.className = className;

  const closeIcon = createIcons("fa-sharp fa-solid fa-xmark");
  const editIcon = createIcons("fa-sharp fa-regular fa-pen-to-square");

  button.appendChild(editIcon);
  button.appendChild(closeIcon);
  return button;
}

function createNewItem(e) {
  e.preventDefault();

  let newItem = itemInput.value;

  if (newItem === "") {
    alert("Enter items Please");
  } else {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = newItem;

    const button = createButton("icons");

    li.appendChild(button);
    ul.appendChild(li);
    itemInput.value = "";
  }

  if (ul.children.length === 1) {
    const clearButton = document.createElement("button");
    clearButton.className = "clear-btn";

    clearButton.innerText = "Clear All";
    wrapper.insertBefore(clearButton, cartForm.nextElementSibling);
  }
}

cartForm.addEventListener("submit", createNewItem);
