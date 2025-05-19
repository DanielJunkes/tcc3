import React, { useEffect } from "react";
import "./App.css";
import Tarefa from "./item";

function App() {
  const [tarefas, setTarefa] = React.useState([]);

  const addItem = async (e) => {
    const item = document.getElementById("item").value;
    if (item === "") {
      alert("Digite um item válido");
    } else {
      await fetch("http://127.0.0.1:8000/api/create_item/", {
        method: "POST",
        body: JSON.stringify({
          item: item,
          status: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTarefa([data.item, ...tarefas])
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          const input = document.getElementById("item");
          input.value = "";
        });
    }
  };

  useEffect(() => {
    const getItens = async () => {
      fetch("http://127.0.0.1:8000/api/get_itens/", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTarefa(data.itens)
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getItens();
  }, []);

  function removerTarefa(id) {
    setTarefa(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <div className="input-container">
        <input 
          id="item" 
          type="text" 
          placeholder="Digite sua tarefa" 
        />
        <button onClick={addItem}>Adicionar</button>
      </div>
      <div className="tasks-container">
        {tarefas.length === 0 ? (
          <div className="empty-state">Nenhuma tarefa adicionada ainda</div>
        ) : (
          tarefas.map((tarefa, index) => (
            <Tarefa key={index} tarefa={tarefa} removerTarefa={removerTarefa} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;