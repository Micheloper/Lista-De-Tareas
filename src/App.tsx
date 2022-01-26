import { type } from "os";
import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  //↓↓↓ Al tipear en input actualiza el estado
  const [task, setTask] = useState<string>("");
  const [saveTask, setSaveTask] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(task);
    setTask("");
    taskInput.current?.focus()
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...saveTask, { name, done: false }];
    setSaveTask(newTasks);
  };

  const DoneTask = (i: number): void => {
    const newTasks: ITask[] = [...saveTask];
    newTasks[i].done = !newTasks[i].done;
    setSaveTask(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...saveTask];
    newTasks.splice(i, 1);
    setSaveTask(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6.offset-md-3">
          <div className="card d-flex align-items-center">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="form-control">
                <input
                  type="text"
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
                  ref={taskInput}
                  autoFocus
                />
                <div className="d-grid gap-2 mt-1">
                  <button className="btn btn-success">Save</button>
                </div>
              </form>
            </div>
          </div>

          {saveTask.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h1 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h1>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => DoneTask(i)}
                >
                  {t.done ? "✓" : "✗"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
