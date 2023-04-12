//Getting all the DOM elements via query selector

const itemInput = document.querySelector(".add-item-input");
const addBtn = document.querySelector(".add-btn");
const filterInput = document.querySelector(".filter-item-input");
const ul = document.querySelector(".list-items");
const cartForm = document.querySelector("#cart-form");
const wrapper = document.querySelector(".wrapper");
const clearBtn = document.querySelector(".clear-btn");

// function that creates an icon which takes the classname as a parameter
function createIcons(className) {
  let icon = document.createElement("i");
  icon.className = className;
  return icon;
}

//function to create a div that contains all the icons in the list items
function createDiv(className) {
  const div = document.createElement("div");
  div.className = className;

  const closeIcon = createIcons("fa-sharp fa-solid fa-xmark");
  const editIcon = createIcons("fa-sharp fa-regular fa-pen-to-square");

  div.appendChild(editIcon);
  div.appendChild(closeIcon);
  return div;
}

function displayItems() {
  const storageItems = fetchItemsFromStorage();

  storageItems.forEach((item) => {
    addToDOM(item);
  });

  checkUI();
}

//creating a new item and passing the new item to the addToDOM fucntion and also the local storage function
function createNewItem(e) {
  e.preventDefault();

  let newItem = itemInput.value;

  if (newItem === "") {
    alert("Enter items Please");
  } else {
    //create item and paste it in the DOM
    addToDOM(newItem);

    //sending the item to the storage
    addToStorage(newItem);

    //checking the state of UI
    checkUI();
    itemInput.value = "";
  }
}

//pasting the li to the DOM
function addToDOM(item) {
  const li = document.createElement("li");
  li.className = "list-item";
  li.innerHTML = item;

  const div = createDiv("icons");

  //li attached in the ul
  li.appendChild(div);
  ul.appendChild(li);
}

function fetchItemsFromStorage() {
  let storageItems;
  if (localStorage.getItem("items") === null) {
    storageItems = [];
  } else {
    storageItems = JSON.parse(localStorage.getItem("items"));
  }

  return storageItems;
}

function addToStorage(item) {
  const storageItems = fetchItemsFromStorage();
  //pushing the new item to the array
  storageItems.push(item);

  //again converting to JSON string before setting to local storage
  localStorage.setItem("items", JSON.stringify(storageItems));
}

function removeFromStorage(item) {
  const storageItems = JSON.parse(localStorage.getItem("items"));

  const filteredItems = storageItems.filter((i) => i !== item);

  //re-setting the local storage
  localStorage.setItem("items", JSON.stringify(filteredItems));
}

// removes the li via event delegation process
function removeItem(e) {
  if (e.target.classList.contains("fa-xmark")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
  const itemToDelete = e.target.parentElement.parentElement.textContent;
  removeFromStorage(itemToDelete);
}

// function updateItem(e) {
//   if (e.target.classList.contains("fa-pen-to-square")) {
//     console.log(e.target.parentElement.parentElement.textContent);
//   }
// }

//UI state checking fucntion
function checkUI() {
  if (ul.children.length === 0) {
    clearBtn.style.display = "none";
    filterInput.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filterInput.style.display = "block";
  }
}

//filtering the items
function filterItems(e) {
  let filterKeyword = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-item");
  listItems.forEach((list) => {
    const itemName = list.textContent.toLowerCase();
    if (itemName.indexOf(filterKeyword) !== -1) {
      list.style.display = "flex";
    } else {
      list.style.display = "none";
    }
  });
}

//resetting the ul items
function clearAllItems() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  //clearing from localStorage
  localStorage.removeItem("items");
  checkUI();
}

function Initialize() {
  // All the event listerners
  cartForm.addEventListener("submit", createNewItem);
  ul.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearAllItems);
  filterInput.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

Initialize();
