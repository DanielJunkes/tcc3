import React, { useState } from "react";
import "./item.css";

function Tarefa({tarefa, removerTarefa}) {
  const item = tarefa;
  const [status, setStatus] = React.useState(item.status);
  const [editar, setEditar] = React.useState(false);

  const updateItem = async (e) => {
    await fetch(`http://127.0.0.1:8000/api/update_item/${item.id}/`, {
      method: "PUT",
      body: JSON.stringify({
        item: item.item,
        status: item.status,
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
      });
  };

  const deletarItem = async (e) => {
      removerTarefa(item.id);

      await fetch(`http://127.0.0.1:8000/api/delete_item/${item.id}/`, {
        method: "DELETE",
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
        });
  };
    
  const alterarStatus = () => {
    item.status = !status;
    setStatus(!status);
    updateItem();
  };

  const alterarItem = () => {
    const itemNovo = document.getElementById(item.id).value;
    if (itemNovo === "") {
      alert("Digite um item válido");
    } else if (itemNovo === item.item) {
      setEditar(!editar);
    } else {
      item.item = itemNovo;
      updateItem();
      setEditar(!editar);
    }
  };

  return (
    <div className="tarefa-container">
      <div className="tarefa-checkbox">
        <input type="checkbox" checked={status} onChange={() => alterarStatus()}/>
      </div>
      
      <div className="tarefa-content">
        {!editar ? (
          <p className={status ? 'tarefa-completed' : ''}>{item.item}</p>
        ) : (
          <inputm type="text" id={item.id} defaultValue={item.item} placeholder="Digite sua tarefa" className="tarefa-edit-input"/>
        )}
      </div>
      
      <div className="tarefa-actions">
        {editar ? (
          <>
            <button className="tarefa-btn tarefa-save-btn" onClick={alterarItem}>
              ✓
            </button>
            <button className="tarefa-btn tarefa-cancel-btn" onClick={() => setEditar(!editar)}>
              ✕
            </button>
          </>
        ) : (
          <>
            <button className="tarefa-btn tarefa-edit-btn" onClick={() => setEditar(!editar)}>
              ✎
            </button>
            <button className="tarefa-btn tarefa-delete-btn" onClick={deletarItem}>
              ×
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Tarefa;