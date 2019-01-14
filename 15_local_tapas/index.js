const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];
const clrAll = document.querySelector(".clrAll");
const selectAll = document.querySelector(".selectAll");
const removeChecked = document.querySelector(".removeChecked");

function addItem(e) {
  e.preventDefault();

  const text = this.querySelector("input[name=item]").value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
  //   console.table(items);
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  items[e.target.dataset.index].done = !items[e.target.dataset.index].done;

  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function clrAllItems() {
  items.forEach(item => {
    item.done = false;
  });

  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function selectAllItems() {
  items.forEach(item => {
    item.done = true;
  });

  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function removeCheckedItems() {
  items.forEach((item, i) => {
    console.log(item, i);
    if (item.done) items.splice(i, 1);
    console.log("end");
  });

  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

populateList(items, itemsList);

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
clrAll.addEventListener("click", clrAllItems);
selectAll.addEventListener("click", selectAllItems);
removeChecked.addEventListener("click", removeCheckedItems);
