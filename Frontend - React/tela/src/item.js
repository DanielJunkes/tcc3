import "./App.css"

function Tarefa(tarefa) {
    console.log('dentro da classe item: ', tarefa)
    return(
        <div>
            <h1>
                {tarefa.item}
            </h1>
            <input type="checkbox" value={tarefa.status}/>
        </div>
    )
}

export default Tarefa;