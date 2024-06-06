/* 1. Implementar o botão "O que eu devo fazer?" (0.5 pontos)
O botão deve ser habilitado somente quando houver pelo menos uma
tarefa cadastrada.
Ao clicar, uma tarefa aleatória da lista deve ser destacada para o
usuário. FEITO mais ou menos


2. Incluir botão de remoção em cada tarefa (0.5 pontos)
Permita que o usuário possa remover tarefas específicas da lista
através de um botão dedicado. FEITO


3. Campo de texto para filtragem de tarefas (1 ponto)
Implemente um campo de texto que filtre e mostre apenas as tarefas
que contêm o texto digitado pelo usuário.

Adicione um botão para marcar tarefas como concluídas, alterando o estilo da tarefa
para incluir um riscado sobre o texto da tarefa concluída.*/



//declara array pera armazenar as tarefas
let taskList = [];

/*ao carregar a página, puxa o elemento do local storage e coloca-os
no array tasklist. Também verifica se há elementos nessa lista,
para saber se o botão de escolha deve ou não ser ativado*/
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

/*função para remover todos os elementos do array tasklist e do local 
storage. também desativa o botão de escolha*/
function removeAll(){
    
    taskList = [];
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTasks();
    document.getElementById('todoButton').disabled=true;
    
}

/*ao adicionar ua tarefa, verifica se o valor é nulo ou não. caso seja, 
exibe mensagem, e caso não seja, adiciona o texto no array tasklist,
limpa a barra de digitação, coloca o valor digitado no localstorage, 
chama a função updateTasks e habilita o botão de escolha*/
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

/*feha a mensagem exibida ao tentar adicionar um valor nulo*/
function closeMessage(){
    let alert = document.getElementById('alert');
    alert.style.display = 'none';
}

/*exibe a mensagem de erro e fecha automaticamente aois 4 segundos*/
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

/*recebe o index do array, e usa o splice para remover o mesmo. após 
isso, remove o item do localstorage, chama a função updateTasks e verifica 
se o tamanho do array é igual a zer. caso seja, o botão de escolha é desabilitado */
function removeItem(index){
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTasks();
    if (taskList.length==0){
        document.getElementById('todoButton').disabled=true;
    }
}

function completeTask(index){
    let completedTask = document.querySelectorAll('#tasks li');
    completedTask[index].classList.toggle('strike');
    localStorage.setItem('taskList', JSON.stringify(taskList));
}



function updateTasks(){
    //recebe a tarefa enviada pelo usuario
    let divTasks = document.getElementById('tasks');
    if(taskList.length > 0){
        //caso o tamanho do array seja maior que zero, cria uma ol
        let newOl = document.createElement('ol');

        /*para cada tarefa no array, cria um li, duas ul e dois botões:
        os botões removeBotao e CompletaBotão sao adicionados à ul buttonUl,
        que é adicionada ao innerLi, junto do texto contido no array para o index informado.
        esse li é adicionado ao newOl.isso é feito para poder agrupar os botões e colocá-los
        no canto sem problemas de formatação*/
        taskList.forEach((task, index)=>{
            
            let newLi = document.createElement('li');
            let innerLi = document.createElement('ul');
            let buttonUl = document.createElement('ul');
            let removeBotao = document.createElement('button');

            // Botão para remover a tarefa
            removeBotao.innerHTML = "Remover tarefa";
            removeBotao.className = "manageTasksButton";
            removeBotao.onclick = function (){
                removeItem(index);
            }

            //Botão para marcar a tarefa como concluída
            let completaBotao = document.createElement('button');
            completaBotao.innerHTML = "Tarefa concluída";
            completaBotao.className = "manageTasksButton";
            completaBotao.onclick = function () {
                completeTask(index);
            }

            // Adiciona o texto da tarefa e os botões na lista
            innerLi.innerText = task;
            buttonUl.appendChild(removeBotao);
            buttonUl.appendChild(completaBotao);
            innerLi.appendChild(buttonUl);
            
            innerLi.style.display = "flex";
            innerLi.style.justifyContent = "space-between";
            
            newLi.appendChild(innerLi);
            newOl.appendChild(newLi);
            
            
        });
        //substitui o 'p' no html pela ol com a tarefa e os botões 
        divTasks.replaceChildren(newOl);
    }else{
        // caso o tamanho do array seja zero, "volta" com o 'p'
        let p = document.createElement('p');
        p.innerText = 'Insira a primeira tarefa para começar....';
        divTasks.replaceChildren(p);
    }

}

//Seleciona e destaca uma tarefa aleatória
function randTask(){
    let i = taskList.length;
    console.log(i);//debug

    if(taskList.length > 0){
        let randonIndex = Math.floor(Math.random() * i);
        console.log(randonIndex);//debug
        let selectedTask = document.querySelectorAll('#tasks li');
        selectedTask.forEach(task => task.classList.remove('highlight'));
        selectedTask[randonIndex].classList.add('highlight');
        console.log(selectedTask);//debug
    }
}
