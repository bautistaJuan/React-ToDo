import TodoApp from "./components/todo-app";
import styles from "./css/index.module.css";
function App() {
  return (
    <div className={styles.appContainer}>
      <TodoApp />
    </div>
  );
}

export default App;
