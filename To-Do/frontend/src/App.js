import React from 'react';
import {useState, useEffect} from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import axios from 'axios'; 
import './App.css';

function App() {
  const [tasklist, setTaskList] = useState([]);
  const [id, setId] = useState();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(null);
  const [priority, setPriority] = useState(null);
  const [date, setDate] = useState(null);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const newTask = {
      queue_id: id,
      title: title,
      description: description,
      status: status,
      priority: priority
      /* duedate: date */
    }

    console.log(newTask)

    await axios.post('http://localhost:1200/api/v1/newTask', newTask);
    setId(id+1)
    fetchContent()

    /* setTaskList([...tasklist, newTask]); */
    setTitle('');
    setDescription('');
    setStatus('');
    setPriority('');
    setDate('');

  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:1200/api/v1/${id}`);
    setId(id-1);
    fetchContent();
  }

  const handleEdit = async (id) => {

    const editTask = {
      title: title,
      description: description,
      status: status,
      priority: priority
    }

    handleDelete(id);
    await axios.patch(`http://localhost:1200/api/v1/${id}`, editTask);
    fetchContent();
  }

  const fetchContent = async () => {
    const res = await axios.get('http://localhost:1200/api/v1/allTask');
    setId(res.data.result)
    setTaskList(res.data.message.tasks);
  }

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setStatus('');
    setPriority('');
    setDate('');
  }

  useEffect( () => {
    fetchContent();
  }, [])

  return (
   <div className = "body">
    Welcome to the task-adder/viewer-ship

    <form onSubmit={handleAddTask} className="form-wrapper">
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
              value = {description}
              onChange={ (ele) => setDescription(ele.target.value)}>
            </textarea>
          </label>
        
        <label>Status :
          <select id="status" name="status" onChange={(ele)=> setStatus( ele.target.value )}>
            <option value="" >---Select---</option>
            <option value="pending" >Pending</option>
            <option value="inProgress" >In progress</option>
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
          <input type='date' id="deadline" value={date} onChange={(ele)=>setDate(ele.target.value)}></input>
        </label>
        <button type='submit'>Submit</button>
        <button type='reset' onClick={handleReset}>Reset</button>
      </form>


      <div className="card-container">
        {tasklist && tasklist.length > 0 ? (
          tasklist.map(ele => (
            <div className="task-card" key={ele._id}>
              <h3>{ele.title}</h3>
              <p><strong>Description:</strong> {ele.description}</p>
              <p><strong>Status:</strong> {ele.status}</p>
              <p><strong>Priority:</strong> {ele.priority}</p>
              <p><strong>Deadline:</strong> {ele.dueDate || ele.deadline}</p>
              
              <div className="card-actions">
                <FaEdit 
                  className="icon-button edit-icon" 
                  title="Edit Task"
                 /*  onClick={() => handleEdit(ele._id)}  */
                />
                <FaTrashAlt 
                  className="icon-button delete-icon" 
                  title="Delete Task"
                  onClick={() => handleDelete(ele._id)} 
                />
              </div>
            </div>
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>

   </div>
  );
}

export default App;
