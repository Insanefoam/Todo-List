const doc = document;
const wnd = window;
const serverUrl = "http://localhost:3000";


let activeBox = doc.getElementsByClassName("todobox__active")[0];
let inactiveBox = doc.getElementsByClassName("todobox__inactive")[0];
let checks = doc.getElementsByClassName("todobox-element__button");
let buttonAddElem = doc.getElementById("adder__submit");
let inputTextField = doc.getElementById("adder__text");

window.addEventListener("beforeunload", function(elem){
    let inactiveTodoes = inactiveBox.childNodes;
    for(let i = 1; i < inactiveTodoes.length; i++){
        deleteTodoFromServer(inactiveTodoes[i].childNodes[0].innerHTML);
    }
})

doc.addEventListener("click", function(elem){
    let src = elem.srcElement;
    let box = src.parentNode.parentNode;

    if(src.className == "todobox-element__button"){
        if(box.className == "todobox__active"){
            inactiveBox.innerHTML += src.parentNode.outerHTML;
            box.removeChild(src.parentNode);
        }
        else if(box.className == "todobox__inactive"){
            activeBox.innerHTML += src.parentNode.outerHTML;
            box.removeChild(src.parentNode);
        }
    }

    let inactiveTodoes = inactiveBox.childNodes;
    for(let i = 1; i < inactiveTodoes.length; i++){
        console.log(inactiveTodoes[i].childNodes[0].innerHTML);
    }
})

//Create new TODO from text field
buttonAddElem.addEventListener("click", function (event){
    postNewTodoToServer(inputTextField.value);
    activeBox.innerHTML += createNewTodo(inputTextField.value).outerHTML;
});

function createNewTodo(text){
    let tmpText = text;
    inputTextField.value = "";
    var newTodo = doc.createElement("div");
    var newTodoText = doc.createElement("div");
    var newTodoCheckbox = doc.createElement("div");
    newTodo.className = "todobox-element"; 
    newTodoText.className = "todobox-element__text"; 
    newTodoCheckbox.className = "todobox-element__button";
    newTodoText.innerHTML += tmpText;
    newTodo.innerHTML += newTodoText.outerHTML + newTodoCheckbox.outerHTML;
    return newTodo;
};

function getAllTodoesFromServer(){
    var request = new XMLHttpRequest();
    request.open("GET", serverUrl);
    request.onload = () => {
        let todoes = JSON.parse(request.response);
        for(let i = 0; i < todoes.length; i++){
            activeBox.innerHTML += createNewTodo(todoes[i].todo_text).outerHTML;
        }
    }
    request.send();
}
getAllTodoesFromServer();

function postNewTodoToServer(text){
    var xtr = new XMLHttpRequest();
    xtr.open("POST", serverUrl + "/add_new_todo", true);
    xtr.send(JSON.stringify({
        todo_text: text
    }));
}

function deleteTodoFromServer(text){
    var xtr = new XMLHttpRequest();
    xtr.open("POST", serverUrl + "/delete_an_todo", true);
    xtr.send(JSON.stringify({
        todo_text: text
    }));
}