import { useState } from "react";

export default function TodoApp() {
  const [title, addTitle] = useState("");
  const [allTodos, setNewListTodo] = useState([]);

  function addTask(e) {
    const newTask = document.querySelector(".inputText");
    e.preventDefault();
    addTitle(newTask.value);
  }

  function handlesubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      complete: false,
    };
    const copy = [...allTodos];
    copy.unshift(newTodo);
    setNewListTodo(copy);
  }
  return (
    <div className="container">
      <form className="formContainer" onSubmit={handlesubmit}>
        <input onChange={addTask} type="text" className="inputText" />
        <input
          onClick={handlesubmit}
          type="submit"
          value="Crear Tarea"
          className="inputBtn"
        />
      </form>
      <div>
        <div className="postTasks">
          {allTodos.map(t => (
            <div key={t.id}>{t.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
