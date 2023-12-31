import { useState } from "react";
import { Todo } from "./todo";
import styles from "../css/todo-app.module.css";
export default function TodoApp() {
  const [title, addTitle] = useState("");
  const [allTodos, setNewListTodo] = useState([]);

  function addTask(e = HTMLInputElement) {
    e.preventDefault();
    const newTask = document.querySelector("#inputTitle");
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
    <div className={styles.todoAppContainer}>
      <h1 className={styles.h1}>Todo App</h1>
      <form className={styles.formContainer}>
        <input
          onChange={addTask}
          type="text"
          className={styles.inputText}
          id="inputTitle"
          value={title}
          autoFocus={true}
          placeholder="Agrega tu nueva tarea"
        />
        <button
          onClick={handlesubmit}
          type="submit"
          className={styles.inputBtn}
        >
          +
        </button>
      </form>
      <div className={styles.postTasksContainer}>
        <div className={styles.postTasks}>
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
