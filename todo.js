const input_tarefa = document.querySelector('.input-tarefa');
        const btn_tarefa = document.querySelector('.btn-tarefa');
        const tarefas = document.querySelector('.Lista-tarefas');



        btn_tarefa.addEventListener('click',function(){
            //Se estiver vazio não faz nada
            if(input_tarefa.value ==='') {
                return;
            }
            //Se estiver preenchido chama a função
            criaTarefa(input_tarefa.value);
        });

        function salvartarefas(){
            const liTarefas = tarefas.querySelectorAll('li');
            const listaTarefas=[];

            for(let item of liTarefas){
                let tarefaTexto = item.innerText;
                tarefaTexto = tarefaTexto.replace('Apagar',' ').trim(); 
                listaTarefas = push(tarefaTexto)
            }

            const tarefasJSON = JSON.stringify(listaTarefas);
            localStorage.setItem('tarefas',tarefasJSON)
        }

        function criaLi(){
            //Criando um elemento li
            const li = document.createElement('li');
            return li;
        }

        function criaBotaoApagar(li){
            li.innerText +=' ';
            //Criando um botao apagar
            const botaoApagar = document.createElement('button');
            //Adicionando o texto no botao
            botaoApagar.innerText='X';
            //Adicionando atributos
            botaoApagar.setAttribute('class','apagar');
            botaoApagar.setAttribute('title','Apagar essa tarefa.')
            li.appendChild(botaoApagar);
        }

        function criaTarefa(entrada){
            const li = criaLi(); 
            li.innerText = entrada;
            tarefas.appendChild(li); 
            limpaInput();
            criaBotaoApagar(li);
        }

        function limpaInput(){
            input_tarefa.value='';
            input_tarefa.focus();
        }

        input_tarefa.addEventListener('keypress', function(e){
            if(e.keyCode == 13){
                if(input_tarefa.value ==='') {
                return;
                }
                criaTarefa(input_tarefa.value);
            }
        });

        document.addEventListener('click',function(e){
            const elemento = e.target;

            //Verifica se o botao apagar foi clicado
            if(elemento.classList.contains('apagar')){
                elemento.parentElement.remove();
                salvartarefas();
            }

        });

        function adicionaTarefasSalvas(){
            const tarefas = localStore.getItem('tarefas');
            const listaTarefas = JSON.parse(tarefas)
            for(let tarefa of listaTarefas){
                criaTarefa(tarefa);
            }
        }
        adicionaTarefasSalvas();