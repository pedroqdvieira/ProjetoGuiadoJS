function incluir(){

    let description = document.getElementById('description');
    if(description.value == ''){
        let message_type = document.getElementById('message_type');
        message_type.innerText = 'Erro';

        let message = document.getElementById('message');
        message.innerText = 'Voce precisa descrever a nove tarefa';
        
        let alert = document.getElementById('alert');
        alert.style.display = 'block';
    }
}
