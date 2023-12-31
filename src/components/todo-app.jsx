import React, { useState, useEffect } from "react";
import { Todo } from "./todo";
import styles from "../css/todo-app.module.css";

export default function TodoApp() {
  const [title, addTitle] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    const loadedTasks = loadTasksFromLocalStorage();
    setAllTodos(loadedTasks);
  }, []);

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
      setNewListTodo([...allTodos, newTodo]);
      addTitle("");
    }
  }

  function handleUpdate(id, value, complete) {
    setNewListTodo(
      allTodos.map(todo =>
        todo.id === id ? { ...todo, title: value, isComplete: complete } : todo
      )
    );
  }

  function handleDelete(id) {
    setNewListTodo(allTodos.filter(todo => todo.id !== id));
  }

  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("todo-app-tasks");
    try {
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  }

  function setNewListTodo(newTodos) {
    localStorage.setItem("todo-app-tasks", JSON.stringify(newTodos));
    setAllTodos(newTodos);
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
