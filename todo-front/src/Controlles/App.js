
export default class App {
    constructor() {
        this.all()
        this.insert()
    }
    request(props = {}) {
        let ajax = new XMLHttpRequest
        ajax.open(`${props.verbo || "GET"}`, `http://localhost/todo/todo-back${props.url || '/'}`)
        ajax.onloadend = (event) => {
            props.handler(JSON.parse(ajax.response))
        }
        ajax.send(props.data || null)
    }

    all() {
        this.request({
            handler: (response) => {
                this.tarefas(response)
            }
        })
    }
    tarefas(tarefas) {

        tarefas.forEach(resultado => {
            let li = document.createElement("li")
            let a = document.createElement("a")
            a.addEventListener("click", (event) => {
                event.preventDefault()
                this.delete(event.target.id)
            })
            a.setAttribute("id", resultado.id)
            a.setAttribute("href", "#")
            a.innerText = " Apagar "
            li.innerText = resultado.tarefa
            document.querySelector("ul").appendChild(li).appendChild(a)
        });
    }

    delete(id) {
        this.request({
            url: "/deletar/" + id, handler: (response) => {
                if (response.sucesso) {
                    alert('Tarefa deletada com sucesso')
                    document.location.reload()
                } else {
                    alert('Erro ao deletar tarefa')
                    document.location.reload()
                }
            }
        })
    }

    insert(data) {
        window.form.submit.addEventListener("click", (event) => {
            event.preventDefault()
            let tarefa = window.form.tarefa.value
            let formData = new FormData()
            formData.append("tarefa", tarefa)
            this.request({
                verbo: "POST", url: "/criar", data: formData, handler: (response) => {
                    if (response.sucesso) {
                        alert('Nova tarefa cadastrada')
                        document.location.reload()
                    } else {
                        alert('tarefa não cadastrada')
                        document.location.reload()
                    }
                }
            })
        })
    }

}