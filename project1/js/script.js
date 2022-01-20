// "use strict"

// variables
const add_task = document.getElementById("btn--add"); // adding function
const clear_list = document.getElementById("btn--clear"); //clear all function
const mylist = document.getElementById("the_list"); //list manipulation
const errmsg = document.getElementById("error")
const errmsg2 = document.getElementById("error2")

const colors = {
      main: "#6200EE",
      main_hover: "#3700B3",
      secondary: "#03dac6",
      secondart_hover: "#018786",
      error: "#B00020",
    };

let d = new Date;
showAll()



// ################### add task ########################
add_task.addEventListener("click", ()=> {
    let all_tasks = [];
    let input_box = document.getElementById("input_text").value;
    if (input_box.trim() == 0) {
            add_task.style.backgroundColor = colors.error;
            errmsg.classList.remove("hidden");
    }else{
          
    all_tasks = JSON.parse(localStorage.getItem("todo"))
    if(all_tasks == null){
        all_tasks = []
    }    
    // let min = () => {if(parseInt(d.getMinutes)<10) return ("0"+d.getMinutes().toString);
    // else return d.getMinutes();}
    let time  = d.toTimeString().split(' ')[0]
    let date = `${time}|${d.getDay()}.${d.getMonth()+1}.${d.getFullYear()}`
    
    let new_task = {
        task: document.getElementById("input_text").value,
        time: date,
    }
    all_tasks.push(new_task)
    localStorage.setItem("todo", JSON.stringify(all_tasks))}
    clear_list.style.backgroundColor = colors.main;
    errmsg2.classList.add("hidden");
    showAll()
})



//################# function for showing all the elements ########################

function showAll(){
    all_tasks = JSON.parse(localStorage.getItem("todo"))
    if(all_tasks == null)
    {
        all_tasks = [];
    }    
    if (all_tasks.length > 0) {
            document.getElementById(
              "message"
            ).innerHTML = `Hello, you have ${all_tasks.length} tasks awating for you!`;
          } else {
            document.getElementById("message").innerHTML = `Hello, you have 0 tasks.`;
          }

    let li_task = ""
    all_tasks.forEach((element, index) => {
            li_task += `<li class="task" id="task${index}" >
                <div id="task--content" onclick="finish_task(${index})">${element.task}</div>
                <span class="trash"
                  ><img
                    src="./images/delete.svg"
                    alt=""
                    srcset=""
                    id="btn--remove"
                    onclick="delete_task(${index})"
                /></span>
                <span class="time">${element.time}</span>
              </li>`;})
                mylist.innerHTML = li_task;
                document.getElementById("input_text").value = "";


}

// delete one task
function delete_task(index){
    all_tasks = JSON.parse(localStorage.getItem("todo"))
    all_tasks.splice(index, 1)
    localStorage.setItem("todo", JSON.stringify(all_tasks))
    showAll()
    const d = document.getElementById(`task${index}`)

}

// restore error mesage on button
function back_to_normal() {
      add_task.style.backgroundColor = colors.main;
      errmsg.classList.add("hidden");
    }
function finish_task(index){
    const f = document.getElementById(`task${index}`)
    f.classList.toggle("complete")

}
// clear all tasks
function clear(){
    local = localStorage.getItem("todo");
    if (local == null) {
        clear_list.style.backgroundColor = colors.error;
        errmsg2.classList.remove("hidden");
        showAll();
    }
    localStorage.clear('todo')
    showAll()
}

clear_list.addEventListener("click", clear);
