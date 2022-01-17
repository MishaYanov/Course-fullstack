// "use strict"

// variables
const add_task = document.getElementById("btn--add"); // adding function
const clear_list = document.getElementById("btn--clear"); //clear all function
const mylist = document.getElementById("the_list"); //list manipulation
const errmsg = document.getElementById("error");
const errmsg2 = document.getElementById("error2");
//global variables
let storage = []; // task array
let cl = []; // array for completion of the tasks
// colors object
const colors = {
  main: "#6200EE",
  main_hover: "#3700B3",
  secondary: "#03dac6",
  secondart_hover: "#018786",
  error: "#B00020",
};
//initialization of the todo list
showAll();
//######## functions #####################

function reset() {
  cl = [];
  storage = [];
  localStorage.clear("todo");
  localStorage.setItem("todo", JSON.stringify(storage));
  add_task.style.backgroundColor = colors.main;
  errmsg.classList.add("hidden");
  clear_list.style.backgroundColor = colors.main;
  errmsg2.classList.add("hidden");
  showAll();
  document.getElementById("create").classList.add("hidden").style.transition =
    "all 2s";
}
function create() {
  document
    .getElementById("create")
    .classList.remove("hidden").style.transition = "all 2s";
}

//reset the button after no input condition event on change of the input box
function back_to_normal() {
  add_task.style.backgroundColor = colors.main;
  errmsg.classList.add("hidden");
}

// function that toggels the complete class on a single task task
function finish_task(index) {
  //base case initialization
  if (cl[index] === undefined) {
    cl[index] = "";
  }
  //checks the state of the task
  if (cl[index] === "") {
    cl[index] = "complete";
    showAll();
  } else {
    cl[index] = "";
    showAll();
  }
}
// remove the task
function delete_task(index) {
  // local = localStorage.getItem('todo')
  // storage = JSON.parse(local);
  storage.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(storage));
  cl[index] = "";
  showAll();
}

// main function looping every time somthing invoked in the the list
function showAll() {
  local = localStorage.getItem("todo");
  if (local == null) {
    storage = []; //set up new todo list
  } else {
    storage = JSON.parse(local); //get all the task I stored
  }
  if (storage.length > 0) {
    document.getElementById(
      "message"
    ).innerHTML = `Hello, you have ${storage.length} tasks awating for you!`;
  } else {
    document.getElementById("message").innerHTML = `Hello, you have 0 tasks.`;
  }
  let li_task = ""; //string for the tasks
  //a loop that creates all the tasks each time the program the program updates.
  storage.forEach((element, index) => {
    li_task += `<li class="task ${cl[index]}" id="task${index}" >
        <div id="task--content" onclick="finish_task(${index})">${element}</div>
        <span class="trash"
          ><img
            src="./images/delete.svg"
            alt=""
            srcset=""
            id="btn--remove"
            onclick="delete_task(${index})"
        /></span>
      </li>`;
  });
  mylist.innerHTML = li_task;
  document.getElementById("input_text").value = "";
}

// clear function for the clear list event.
function clear() {
  local = localStorage.getItem("todo");
  if (storage.length == 0) {
    clear_list.style.backgroundColor = colors.error;
    errmsg2.classList.remove("hidden");
    showAll();
  }
  if (local != null) {
    cl = [];
    storage = [];
    localStorage.clear("todo");
    localStorage.setItem("todo", JSON.stringify(storage));
    showAll();
  }
}

// ############# Events #####################

// Add task event
add_task.addEventListener("click", () => {
  let input_box = document.getElementById("input_text").value;
  if (input_box.trim() == 0) {
    add_task.style.backgroundColor = colors.error;
    errmsg.classList.remove("hidden");
  } else {
    storage.push(input_box);
    // localstorage = localStorage.setItem("todo", input_box); no needmbecause showAll() function invoked and the local storage is updated
  }
  localStorage.setItem("todo", JSON.stringify(storage));
  //reset clear button
  clear_list.style.backgroundColor = colors.main;
  errmsg2.classList.add("hidden");
  showAll();
});

// Cear list event
clear_list.addEventListener("click", clear);
