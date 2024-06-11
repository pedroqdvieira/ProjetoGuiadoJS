
let taskList;
let taskComplete = [];
let i = 0;


function loadtasks() {
    let list = localStorage.getItem('taskList');
    taskList = list ? JSON.parse(list) : [];
    updateTask();
}


function addTask(event) {

    event.preventDefault();
    let description = document.getElementById('description');
    if (description.value == '') {
        showMessage();
    } else {
        taskList.push({ description: description.value, completed: false, highlight: false });
        description.value = '';
        localStorage.setItem('taskList', JSON.stringify(taskList));
        updateTask();
    }
}


function closeMessage() {
    let alert = document.getElementById('alert');
    alert.style.display = 'none';
}


function showMessage() {
    let message_type = document.getElementById('message_type');
    message_type.innerText = 'Erro: ';
    let message = document.getElementById('message');
    message.innerText = 'Você precisa descrever a tarefa.';
    let alert = document.getElementById('alert');
    alert.style.display = 'block';
    setTimeout(() => {
        closeMessage();
    }, 4000);
}


function updateTask() {

    let divTasks = document.getElementById('task');
    divTasks.innerHTML = '';

    if (taskList.length > 0) {

        let newOl = document.createElement('ol');
        taskList.forEach((task, index) => {

            let newLi = document.createElement('li');
            newLi.classList.add("item");
            newLi.innerText = task.description;
            let completeButton = document.createElement('button');
            completeButton.innerText = 'Tarefa Completa';
            completeButton.className = 'manageTasksButton';

            completeButton.onclick = function () {
                completeTask(index);
            };

            let removeButton = document.createElement('button');
            removeButton.innerText = 'Remover Tarefa';
            // Define a classe do botão
            removeButton.className = 'manageTasksButton';
            removeButton.onclick = function () {
                removeTask(index);
            };

            let buttonUl = document.createElement('ul');
            buttonUl.appendChild(completeButton);
            buttonUl.appendChild(removeButton);
            newLi.appendChild(buttonUl);
            newLi.style.display = "flex";
            newLi.style.justifyContent = "space-between";
            let outerLi = document.createElement('li');
            
            if (task.completed) {
                newLi.style.textDecoration = 'line-through';
            }
            
            if(task.highlight){
                console.log(task);
                newLi.classList.add('highlight');
                console.log(newLi);
            }

            outerLi.appendChild(newLi);

            

            newOl.appendChild(outerLi);
        });

        divTasks.appendChild(newOl);

    } else {

        let p = document.createElement('p');
        p.innerText = 'Insira a primeira tarefa para começar...';
        divTasks.appendChild(p);

    }

    let botaoEscolherTarefa = document.getElementById('botaoEscolherTarefa');
    botaoEscolherTarefa.disabled = taskList.length === 0;
}

function completeTask(index) {
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTask();
    taskComplete[i] = taskList[index];
    i++;
}

function removeTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTask();
}

function removeAll() {
    taskList = [];
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTask();
}

function randTask() {
    if (taskList.length > 0) {
        let indiceAleatorio = Math.floor(Math.random() * taskList.length);
        let tarefaEscolhida = taskList[indiceAleatorio];

        if (tarefaEscolhida.completed == true) {
            randTask();
        } else {
            alert('Eis o que você deve fazer agora: ' + tarefaEscolhida.description);
            localStorage.setItem('taskList', JSON.stringify(taskList));
            updateTask();
        }
    }
}

function searchTask(event) {
    event.preventDefault();
    let termo = document.getElementById('term').value;
    termo = termo.toLowerCase();
    
    if(termo == ''){
        removeHighlights();
    }else{
        taskList.forEach((task, index) => {
            let x = task.description;
            if (x.includes(termo)) {

                    showFilter(index);
            }
        });
    }
    
    
}

function removeHighlights(){
    taskList.forEach(task => {
        task.highlight = false;
    });

    updateTask();
}

function showFilter(index){
    taskList[index].highlight = true;
    
    updateTask();
}
