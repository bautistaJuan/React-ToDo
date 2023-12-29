import { useState } from "react";
import "./../css/style-todo.css";

function Todo({ task, upDate, onDelete }) {
  // Funciona como un interruptor para poder habilitar la opcion de editar
  const [isEdit, setEdit] = useState(false);

  // Esta funcion permite que edites la tarea que creaste.
  function FormEdit() {
    const [newTitle, setNewTitle] = useState(task.title);

    const handlesubmit = e => {
      e.preventDefault();
    };
    const handleChange = e => {
      e.preventDefault();
      const value = e.target.value;
      setNewTitle(value);
    };
    const handleClickButton = e => {
      // Avisa al componente padre sobre el cambio
      upDate(task.id, newTitle);
      setEdit(false);
    };
    return (
      <form className="formContainer" onClick={handlesubmit}>
        <input
          className="inputEdit"
          type="text"
          onChange={handleChange}
          // este value muestra el title actual
          value={newTitle}
        />
        <button className="button" onClick={handleClickButton}>
          Guardar
        </button>
      </form>
    );
  }
  //  // // // //
  function Card() {
    return (
      <div className="cardContainer">
        <span className="title"> {task.title} </span>
        <div className="buttonsEdit">
          <button
            onClick={() => {
              setEdit(true);
            }}
          >
            Editar
          </button>
          <button onClick={e => onDelete(task.id)}>Borrar</button>
          <input className="checkbox" type="checkbox"></input>
        </div>
      </div>
    );
  }

  //   //
  return (
    <div className="containerTodo">{isEdit ? <FormEdit /> : <Card />} </div>
  );
}
export { Todo };
