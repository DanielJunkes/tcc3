import React, { useEffect } from "react";
import "./App.css";
import Tarefa from "./item";

function App() {
  const addItem = async (e) => {
    const item = document.getElementById("item").value;
    await fetch("http://127.0.0.1:8000/api/create_item/", {
      method: "POST",
      body: JSON.stringify({
        item: item,
        status: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        const input = document.getElementById("item");
        input.value = "";
      });
  };

  const [tarefas, setTarefa] = React.useState([]);

  useEffect(() => {
    const getItens = async (e) => {
      
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

  console.log(tarefas);

  return (
    <div className="App">
      <input id="item" type="text" placeholder="Digite sua tarefa" />
      <button onClick={addItem}>Adicionar</button>
      {tarefas.map((tarefa, index) => (
        <Tarefa key={index}  tarefa={tarefa} />
      ))}
    </div>
  );
}

export default App;
