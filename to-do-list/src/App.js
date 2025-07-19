import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';

/* useState, rendering lists, component structure */

function App() {
  
  const [task, setTask] = useState([]);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');

  function getData(e) {
    e.preventDefault();

    const newTask = {
      id: id,
      title: title,
      description: desc,
      status: status,
      priority: priority,
      deadline: deadline
    }

    setTask([...task, newTask]);
    /* setId(id + 1);
    setTitle('');
    setDesc('');
    setStatus('');
    setPriority('');
    setDeadline('');
 */

  }

  useEffect(()=>{
    localStorage.setItem('task' , JSON.stringify(task))
  }, [task]);
  
  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('task'));
    if (storedData) setTask(storedData); 
    const lastId = storedData[storedData.length - 1]?.id || 0;
    setId(lastId + 1);
  }, [])
  

  return (
    <div className="body">
      

      <form className="form-tasks" onSubmit={getData}>
        <label>Title :
          <input 
            type='text' 
            id="title" 
            value = {title}
            onChange={ (ele) => setTitle(ele.target.value)}>
          </input>
        </label>

        <label>Description : </label>
          <label>
            <textarea 
              name="desc" 
              id="desc" 
              rows="3" 
              cols="30"
              value = {desc}
              onChange={ (ele) => setDesc(ele.target.value)}>
            </textarea>
          </label>
        
        <label>Status :
          <select id="status" name="status" onChange={(ele)=> setStatus( ele.target.value )}>
            <option value="" >---Select---</option>
            <option value="pending" >Pending</option>
            <option value="started" >Started</option>
            <option value="in progress" >In progress</option>
            <option value="done" >Done</option>
          </select>
        </label>
        <label>Priority :
          <select id="priority" name="priority" onChange={(ele)=> setPriority( ele.target.value )}>
              <option value="" >---Select---</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
        </label>
        <label>Deadline :
          <input type='date' id="deadline" value={deadline} onChange={(ele)=>setDeadline(ele.target.value)}></input>
        </label>
        <button type='submit'>Submit</button>
      </form>

      {/* Show added tasks */}
      <table>
        <tr>
          <td>Sr.no</td>
          <td>Title</td>
          <td>Description</td>
          <td>Status</td>
          <td>Priority</td>
          <td>Deadline</td>
        </tr>
        {task.map( ele => (
          <tr>
            <th>{ele.id}</th> 
            <th>{ele.title}</th>
            <th>{ele.description}</th>
            <th>{ele.status}</th>
            <th>{ele.priority}</th>
            <th>{ele.deadline}</th>
          </tr>
        ))}
      </table>
      <ul>
        
      </ul>



    </div>
  );
}

export default App;
