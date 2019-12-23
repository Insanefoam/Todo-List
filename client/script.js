var form = document;
var todobox = form.getElementsByClassName("todobox")[0];
var checksTodo = form.getElementsByClassName("todobox-element__button");
var buttonAddElem = form.getElementById("adder__submit");
var textAddElem = form.getElementById("adder__text");

var url = "http://localhost:3000";

//Add for all checkboxes hide-after-click property
function addListers(){
for(let i = 0; i < checksTodo.length; i++){
    checksTodo[i].addEventListener("click", function (elem) {
        var num = i;
        if(elem.srcElement.parentNode.parentNode != null)
            elem.srcElement.parentNode.parentNode.removeChild(elem.srcElement.parentNode);
        deleteTodoFromServer(elem.srcElement.parentNode.firstChild.innerHTML);
    });
};
}

//Create new TODO from text field
buttonAddElem.addEventListener("click", function(event){
    postNewTodoToServer(textAddElem.value);
    let newTodo = createNewTodo(textAddElem.value);
    addListers();
});


function createNewTodo(text){
    let tmpText = text;
    textAddElem.value = "";
    var newTodo = form.createElement("div");
    var newTodoText = form.createElement("div");
    var newTodoCheckbox = form.createElement("div");
    newTodo.className = "todobox-element"; 
    newTodoText.className = "todobox-element__text"; 
    newTodoCheckbox.className = "todobox-element__button";
    newTodoText.innerHTML += tmpText;
    newTodo.innerHTML += newTodoText.outerHTML + newTodoCheckbox.outerHTML;
    todobox.innerHTML += newTodo.outerHTML;
    addListers();
};

function getAllTodoesFromServer(){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    let todoes;
    var requestBody;
    request.onload = () => {
    todoes = JSON.parse(request.response);
    for(let i = 0; i < todoes.length; i++){
        createNewTodo(todoes[i].todo_text);
    }
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