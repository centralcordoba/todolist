import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";
import TaskDataService from "./Services/task.service";

const App: FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadLine] = useState<string>();
  
  const [todoList, setTodoList] = useState<
    { taskName: string; deadline: string | undefined }[]
  >([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadLine(event.target.value);
    }
  };

  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "filter") {
      setFilter(event.target.value);
    } 
  };

  TaskDataService.getAll()
    .then((response: any) => {
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });

  TaskDataService.delete(task)
    .then((response: any) => {
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setDeadLine(event.target.value);
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);

    TaskDataService.create(newTask)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

  const handleOnClickFilter = (): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName === filter;
        
      })
    );
  };

  return (
    <div className="App">
      <div className="header"></div>
      <div>
        <input 
        type="text" 
        placeholder="filter..." 
        name="filter"
        value={filter} 
        onChange={handleChangeFilter}/>
        <button onClick={handleOnClickFilter}>Filter</button>
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
