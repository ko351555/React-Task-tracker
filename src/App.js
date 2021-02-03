import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTask =async()=>{
      const tasksFromServer =await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTask();
  },[]);

  //Fetch Task
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json();
    console.log(data)
    return   data 
}; 
  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json();
    console.log(data)
    return   data 
}; 


  //Add Task
  const addTask =async (task) => {
    // const id = Math.floor(Math.random() * 10000 + 1);
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
      const res=await fetch('http://localhost:3000/tasks',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(task)
      })
      const data=await res.json();
      setTasks([...tasks,data])
    }
  
  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`,{
      method :'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Remainder
  const toggleReminder = async(id) => {
    const tasktotoggle=await fetchTask(id)
    const updttask={...tasktotoggle,reminder:!tasktotoggle.reminder}
    const res=await fetch(`http://localhost:3000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(updttask) })
      const data =await res.json()

   
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.remainder } : task
      )
    );
  };
  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks to Show"
      )}
    </div>
  );
};
export default App;
