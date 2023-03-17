import userEvent from "@testing-library/user-event";
import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

import { filter } from 'rxjs/operators';

const App: FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [task, setTask] = useState<string>(""); 
  const [deadline, setDeadLine] = useState<string>();
  const [todoList, setTodoList] = useState<{taskName: string; deadline: string | undefined} []>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadLine((event.target.value));
    }
  };
 
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setDeadLine((event.target.value));
  };
  
  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);  
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

  const handleOnClick =() =>{
    const findTask = todoList?.length > 0 ? todoList?.filter(f => f.taskName === filter):undefined;
    const newTask = { taskName: task, deadline: deadline };
    console.log("resultados", findTask);
    setTodoList([...todoList, newTask]);  
  }

  return (
    <div className="App">
      <div className="header"></div>
      
      <div className="inputContainer">
        <input
          type="text"
          placeholder="filter..."         
          value={filter}          
        />        

        <button onClick={handleOnClick}>Filter</button>
      </div>
      
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Task..."
          name="task"
          value={task}
          onChange={handleChange}
        />
        <select onChange={selectChange}>
        <option selected disabled>
          Choose one
        </option>
        <option value="completed">Completed</option>
        <option value="nocompleted">No Completed</option>       
        </select>
        {/* <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          /> */}

        <button onClick={addTask}>Add Task</button>
      </div>


      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
