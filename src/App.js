import React, {useState, useRef, useEffect} from 'react';
import logo from './logo.svg';
// import './App.css';

import {nanoid} from "nanoid";

import Todo from "./components/Todo"
import Form from "./components/Form"
import FilterButton from "./components/FilterButton"

// Note: Since we're now utilizing usePrevious() in two files, 
// a good efficiency refactor would be to move the usePrevious() 
// function into its own file, export it from that file, 
// and import it where you need it. 
// Try doing this as an exercise once you've got to the end.

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed, //prop is false
  Completed : task => task.completed // prop is true
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {

  const [tasks,setTask] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const addTask = (name) =>{
    // alert(name);
    const newTask = {id : "todo-" + nanoid(), name: name , completed:false};
    setTask([...tasks,newTask])
  }

  //toggle checkbox
  const toggleTaskCompleted = (id) => {
    // console.log(tasks[0])
    const updatedTasks = tasks.map(task => {
        //if this task has the same ID as the edited task
        if(id === task.id) {
          //use object spread to make a new object
          // whose `completed` prop has been inverted
          return {...task,completed: !task.completed}
        }
        return task;
    });

    setTask(updatedTasks);
  }

  //deleteTask
  const deleteTask = (id) => {
    console.log(id)
    const remainingTask = tasks.filter(task => id !== task.id);
    setTask(remainingTask)
  }

//deleteTask
  const editTask = (id,newName) => {
    const editedTaskList = tasks.map(task => {
      //if this task has the same ID as the edited task
      if (id === task.id){
        //
        return {...task, name:newName}
      }
      return task;
    });
  
    setTask(editedTaskList);
  }

  // mdn
  const taskList = tasks.filter(FILTER_MAP[filter])
  .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted = {toggleTaskCompleted}
        ondeleteTask = {deleteTask}
        onEditTask = {editTask}
      />
    )
  ).reverse(); // print task in reverse order

  // my solution
  // const taskList = props.tasks.map(task=>
  //    {
  //      return <Todo name={task.name}/>
  //    }
  //   );

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed = {name === filter}
      setFilter = {setFilter}
      />
    )
  )

  const taskNoun = taskList.length !== 1 && taskList.length !== 0 ? 'tasks' :'task';
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  //filter buttons
  
  const listHeadingRef = useRef(null)
  const prevTaskLength = usePrevious(tasks.length)

  useEffect(() => {
    if(tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length,prevTaskLength]);





  return (
    <div className="todoapp stack-large">
      <h1>My List</h1>
      <Form addTask = {addTask}/>
      

      <div className="filters btn-group stack-exception"
      >

        {filterList}
        
        {/* <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show</span>
          <span>Active</span>
          <span className="visually-hidden"> task</span>
        </button>

        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show</span>
          <span>Completed</span>
          <span className="visually-hidden"> task</span>
        </button>
        */}
      </div> 

      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
       {headingText}
      </h2>

      

      <ul 
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >

      {taskList}

      {/* <li className="todo stack-small">
        <div className="c-cb">
          <input id="todo-0" type="checkbox" defaultChecked={true} />
          <label className="todo-label" htmlFor="todo-0">
            Eat
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
          Edit <span className="visually-hidden">Eat</span>
          </button>
          <button type="button" className="btn">
          Delete <span className="visually-hidden">Eat</span>
          </button>
        </div>
      </li>

      <li className="todo stack-small">
        <div className="c-cb">
          <input id="todo-1" type="checkbox" />
          <label className="todo-label" htmlFor="todo-1">
            Sleep
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Sleep</span>
          </button>
          <button type="button" className="btn">
            Delete <span className="visually-hidden">Sleep</span>
          </button>
        </div>
      </li>

      <li className="todo stack-small">
        <div className="c-cb">
          <input id="todo-2" type="checkbox" />
          <label className="todo-label" htmlFor="todo-2">
            Repeat
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Repeat</span>
          </button>
          <button type="button" className="btn">
            Delete <span className="visually-hidden">Repeat</span>
          </button>
        </div>
      </li> */}

      </ul>

    </div>

  );
}

export default App;
