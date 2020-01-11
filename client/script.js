var form = document;
var activeBox = form.getElementsByClassName("todobox__active")[0];
var checksTodo = form.getElementsByClassName("todobox-element__button");
var inactiveBox = form.getElementsByClassName("todobox__inactive")[0];
var buttonAddElem = form.getElementById("adder__submit");
var inputTextField = form.getElementById("adder__text");

var url = "http://localhost:3000";

//Add for all checkboxes hide-after-click property
function addListeners(){
for(let i = 0; i < checksTodo.length; i++){
    checksTodo[i].addEventListener("click", function (elem) {
        if(elem.srcElement.parentNode.parentNode != null){
            inactiveBox.innerHTML += elem.srcElement.parentNode.outerHTML;
            //Delete from active todobox todo element
            elem.srcElement.parentNode.parentNode.removeChild(elem.srcElement.parentNode);
        }
        deleteTodoFromServer(elem.srcElement.parentNode.firstChild.innerHTML);
    });
};
}

//Create new TODO from text field
buttonAddElem.addEventListener("click", function (event){
    postNewTodoToServer(inputTextField.value);
    activeBox.innerHTML += createNewTodo(inputTextField.value).outerHTML;
    console.log("dwadwa");
    addListeners();
});


function createNewTodo(text){
    let tmpText = text;
    inputTextField.value = "";
    var newTodo = form.createElement("div");
    var newTodoText = form.createElement("div");
    var newTodoCheckbox = form.createElement("div");
    newTodo.className = "todobox-element"; 
    newTodoText.className = "todobox-element__text"; 
    newTodoCheckbox.className = "todobox-element__button";
    newTodoText.innerHTML += tmpText;
    newTodo.innerHTML += newTodoText.outerHTML + newTodoCheckbox.outerHTML;
    return newTodo;
};

function getAllTodoesFromServer(){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = () => {
        let todoes = JSON.parse(request.response);
        for(let i = 0; i < todoes.length; i++){
            activeBox.innerHTML += createNewTodo(todoes[i].todo_text).outerHTML;
        }
        addListeners();
    }
    request.send();
}
getAllTodoesFromServer();

function postNewTodoToServer(text){
    var xtr = new XMLHttpRequest();
    xtr.open("POST", url + "/add_new_todo", true);
    xtr.send(JSON.stringify({
        todo_text: text
    }));
}

function deleteTodoFromServer(text){
    var xtr = new XMLHttpRequest();
    xtr.open("POST", url + "/delete_an_todo", true);
    xtr.send(JSON.stringify({
        todo_text: text
    }));
}