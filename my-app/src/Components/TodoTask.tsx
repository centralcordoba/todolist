import React from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

function TodoTask({ task, completeTask }: Props) {
  return (
    <div className="task">
      <div className="content">
        <span>{task?.taskName}</span>
        <span>{task?.deadline}</span>
      </div>
      <button onClick={()=>{
        completeTask(task.taskName)
      }}>DELETE</button>
    </div>
  );
}


export default TodoTask;
