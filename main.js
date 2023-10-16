let addButton = document.getElementById("add-button");
let inputArea = document.getElementById("input-box");
let tasklist = [];
let list = [];
let filteredList = [];
let mode = "all";
let menus = document.querySelectorAll("#menus button"); // menus 하위의 button 태그들을 모두 가져온다

// menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByTopic(event)))
menus.forEach((menu) => menu.addEventListener("click", (event) => getTasksByMenu(event)));

function getTasksByMenu(event) {
    mode = event.target.id;
    filteredList = []; // 메뉴 선택할 때마다 초기화를 우선 해줘야한다
    

    if(mode == "all") {
        render();
    } else if (mode == "ongoing") {
        for( let i=0; i<tasklist.length; i++) {
            if(tasklist[i].isComplete == false) {
                filteredList.push(tasklist[i]);
            }
        }
        console.log(filteredList);
        render();
    } else if (mode == "done") {
        for(let i=0; i<tasklist.length; i++){
            if(tasklist[i].isComplete == true) {
                filteredList.push(tasklist[i]);
            }
        }
        console.log(filteredList);
        render();
    }
}


inputArea.addEventListener("focus", () => { inputArea.value = "";}) // 사용자의 편의를 위해 입력창을 클릭하면 기존의 입력된 내용을 지워준다


const render = () => { // render() 함수는 결과를 화면에 표현해주는 함수

    if(mode == "all") {
        list = tasklist;
    } else if (mode == "ongoing"){
        list = filteredList;
    } else if (mode == "done") {
        list = filteredList;
    }



    let taskHTML = ""; // 처음에 taskHTML을 비워줘야 한다 - 호출한 위치의 데이터로 새로 만들어야 하기 때문에

    for( let i=0; i<list.length; i++) { // 입력한 각각의 할 일들에 대한 버튼 처리를 하기 위해서는 각 할 일을 구분하기 위한 고유의 값이 필요하기 때문에 객체를 사용한다
        if(list[i].isComplete == false){
            taskHTML += `<div class="row board-style">
            <div class="col-lg-8 text-style">
                ${list[i].work}
            </div>
            <div class="col-lg-4">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color: #3a8c03;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color: #ff0000;"></i></button>
            </div>
        </div>`
        } else if( list[i].isComplete == true ) {
            taskHTML += `<div class="row board-style">
        <div class="col-lg-8 text-style true-style">
            ${list[i].work}
        </div>
        <div class="col-lg-4">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color: #3a8c03;"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color: #ff0000;"></i></button>
        </div>
    </div>`
        }
        
    }

    document.getElementById("task-board").innerHTML = taskHTML;
}



function deleteTask(id) { // 배열 안의 입력한 한 일들을 render() 함수를 통해서 그려내기 때문에 배열 안의 원소들을 수정해주면 삭제 작업을 수월하게 진행할 수 있다
    for(let i=0; i<tasklist.length; i++){
        if(tasklist[i].id == id){
            tasklist.splice(i, 1); // 배열의 splice(i, 1) 메서드는 i번째 인데스부터 1개의 원소를 삭제하고 기존의 배열을 변경한 새로운 배열을 결과값으로 준다
        }
    }
    console.log(tasklist);
    render(); // 새로워진 tasklist 배열을 화면에 보이도록 구성해주는 render() 함수 호출
}



function toggleComplete(id) { // check 버튼을 클릭했을 때 isComplete 불리언 값을 변경해주는 onclick 함수
    for( let i=0; i<tasklist.length; i++){
        if(tasklist[i].id == id) {
            tasklist[i].isComplete = !tasklist[i].isComplete;
        }
    }
    console.log(tasklist);
    render();
}



const addTask = () => {
    let task = {
        work : inputArea.value,
        id : randomID(),
        isComplete : false
    };
    tasklist.push(task);
    console.log(tasklist);
    render();
}



addButton.addEventListener("click", addTask)


function randomID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}