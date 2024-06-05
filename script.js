let taskList = [];

function loadTasks(){
    let list = localStorage.getItem("taskList");
    taskList = list ? JSON.parse(list) : taskList = [];
    updateTasks();

    if (taskList.length == 0){
        document.getElementById('todoButton').disabled=true;
    }else{
        document.getElementById('todoButton').disabled=false;
    }
}

function removeAll(){
    
    taskList = [];
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTasks();
    document.getElementById('todoButton').disabled=true;
    
}

function addTask(event){
    event.preventDefault();
    let description = document.getElementById('description');
    if(description.value == ''){
        showMessage();
    }else{
        taskList.push(description.value);
        description.value = '';
        localStorage.setItem('taskList', JSON.stringify(taskList));
        updateTasks();
        document.getElementById('todoButton').disabled=false;
    }
}

function closeMessage(){
    let alert = document.getElementById('alert');
    alert.style.display = 'none';
}

function showMessage(){
    let message_type = document.getElementById('message_type');
    message_type.innerText = 'Erro:';

    let message = document.getElementById('message');
    message.innerText = 'Voce precisa descrever a nova tarefa';
    
    let alert = document.getElementById('alert');
    alert.style.display = 'block';

    setTimeout(()=>{
        closeMessage();
    }, 4000);
}

function removeItem(index){
   taskList.splice(index, 1);
   localStorage.setItem('taskList', JSON.stringify(taskList));
   updateTasks();
}


function updateTasks(){
    let divTasks = document.getElementById('tasks');
    if(taskList.length > 0){
        let newOl = document.createElement('ol');

        taskList.forEach((task, index)=>{
            let newLi = document.createElement('li');
            let innerLi = document.createElement('ul');
            let buttonUl = document.createElement('ul');
            let removeBotao = document.createElement('button');
            removeBotao.innerHTML = "Remover tarefa";
            removeBotao.id = "removeTarefaBotao";
            removeBotao.onclick = function (){
                removeItem(index);
            }
            let completaBotao = document.createElement('button');
            completaBotao.innerHTML = "Tarefa concluída";
            removeBotao.id = "removeTarefaBotao";

            innerLi.innerText = task;
            buttonUl.appendChild(removeBotao);
            buttonUl.appendChild(completaBotao);
            innerLi.appendChild(buttonUl);
            innerLi.style.display = "flex";
            innerLi.style.justifyContent = "space-between";
            newLi.appendChild(innerLi);
            newOl.appendChild(newLi);
            
            
        });
        divTasks.replaceChildren(newOl);
    }else{
        let p = document.createElement('p');
        p.innerText = 'Insira a primeira tarefa para começar....';
        divTasks.replaceChildren(p);
    }

}

function randTask(){
    let i = taskList.length;
    console.log(i);

    if(taskList.length > 0){
        let randonIndex = Math.floor(Math.random() * i);
        console.log(randonIndex);
        let selectedTask = document.querySelectorAll('#tasks li');
        selectedTask.forEach(task => task.classList.remove('highlight'));
        selectedTask[randonIndex].classList.add('highlight');
        
        console.log(selectedTask);
    }
}
