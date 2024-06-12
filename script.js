//Variaveis globais
let taskList; //lista de tarefas
let taskComplete = []; //array de tarefas completas
let i = 0; //contador de tarefas completas

//função para carregar as tarefas
function loadtasks() {
    let list = localStorage.getItem('taskList');
    taskList = list ? JSON.parse(list) : [];
    updateTask();
}

//adiciona tarefas no array de tarefas e no localstorage
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

//fecha mensagem de erro
function closeMessage() {
    let alert = document.getElementById('alert');
    alert.style.display = 'none';
}

//mostra mensagem de erro
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

//adiciona tarefas na página, assim como os botões de remover e conclui tarefa
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

            //caso a tarefa seja marcada como completa, adiciona text decoration
            if (task.completed) {
                newLi.style.textDecoration = 'line-through';
            }
            
            //adiciona hilight na tarefa para pesquisa de tarefas
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

        //caso nao haja tarefas para mostrar, exibe p
        let p = document.createElement('p');
        p.innerText = 'Insira a primeira tarefa para começar...';
        divTasks.appendChild(p);

    }

    //desativa botao de escolher tarefas caso nao haja tarefas na lista
    let botaoEscolherTarefa = document.getElementById('botaoEscolherTarefa');
    botaoEscolherTarefa.disabled = taskList.length === 0;
}

//toggle propriedade completed na tarefa para marcá-la como concluida e joga a tarefa no array de tarefas concluidas
function completeTask(index) {
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTask();
    taskComplete[i] = taskList[index];
    i++;
}

//remove tarefas do array atraves da função splice()
function removeTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTask();
}

//limpa o array de tarefas ao clicar em 'remover todos'
function removeAll() {
    taskList = [];
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTask();
}

//escolhe a tarefa aleatoria e exibe um alerta para destacar a tarefa escolhida
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

//procura no array de tarefas por tarefas que contenham o termo digitado;
//chama função de remover highlight para previnir que palavras que nao contem o termo sejam destacadas
//converte o termo pesquisado para minusculo para auxiliar na procura de tarefas, apos isso compara o termo pesquisado com a descrição da tarefa no array de tarefas, também convertido para minusculo
function searchTask(event) {
    event.preventDefault();
    removeHighlights();
    let termo = document.getElementById('term').value;
    termo = termo.toLowerCase();
    
    if(termo == ''){
        removeHighlights();
    }else{
        taskList.forEach((task, index) => {
            let x = task.description.toLowerCase();
            if (x.includes(termo)) {

                    showFilter(index);
            }
        });
    }
    
    
}

//remove a propriedade de hilight das tarefas no array
function removeHighlights(){
    taskList.forEach(task => {
        task.highlight = false;
    });

    updateTask();
}

//dá a propriedade de hilight pras tarefas no array 
function showFilter(index){
    taskList[index].highlight = true;
    
    updateTask();
}
