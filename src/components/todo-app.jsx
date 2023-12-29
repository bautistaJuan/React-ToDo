import { useState } from "react";
import { Todo } from "./todo";
export default function TodoApp() {
  const [title, addTitle] = useState("");
  const [allTodos, setNewListTodo] = useState([]);

  function addTask(e) {
    e.preventDefault();
    const newTask = document.querySelector(".inputText");
    addTitle(newTask.value);
  }

  function handlesubmit(e) {
    e.preventDefault();
    if (title !== "") {
      const newTodo = {
        id: crypto.randomUUID(),
        title,
        complete: false,
      };
      const copy = [...allTodos];
      copy.unshift(newTodo);
      setNewListTodo(copy);

      addTitle("");
    }
  }
  function handleUpdate(id, value) {
    const copy = [...allTodos];
    const item = copy.find(items => items.id === id);
    // Al encontrar el ID que se esta modificando (Llega como parametro) modifica solamente el title (Llega como parametro)
    item.title = value;
    // Actualiza las tareas editadas.
    setNewListTodo(copy);
  }
  function handleDelete(id) {
    const todos = allTodos.filter(t => t.id !== id);

    setNewListTodo(todos);
  }
  return (
    <div className="todoAppContainer">
      <form className="formEdit">
        <input
          onChange={addTask}
          type="text"
          className="inputText"
          value={title}
        />
        <input
          onClick={handlesubmit}
          type="submit"
          value="Crear Tarea"
          className="inputBtn"
        />
      </form>
      <div>
        <div className="postTasks">
          {allTodos.map(task => (
            <Todo
              key={task.id}
              task={task}
              upDate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
