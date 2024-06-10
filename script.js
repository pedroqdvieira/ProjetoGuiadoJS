
let taskList;
let taskComplete = [];
let taskSearch =[];
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
        taskList.push({ description: description.value, completed: false });
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
            outerLi.appendChild(newLi);

            if (task.completed) {
                newLi.style.textDecoration = 'line-through';
            }
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

/*function searchTask(event) {

    event.preventDefault();
    let termo = document.getElementById('term');
    taskSearch.push({ description: termo.value, completed: false });
    //console.log(description.value);
    if (termo.value == '') {
        showMessage();
    } else {

       console.log(taskList.indexOf(termo.description));
        //console.log(taskList.filter(filtro));
        //console.log(taskList)
    }
}

//function filtro(termo){
//    let description = document.getElementById('term');
//    return termo.value == description.value;
//}*/
