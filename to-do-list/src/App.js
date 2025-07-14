import './App.css';
import React from 'react';
import {useState} from 'react';
import data from './data.js';

/* useState, rendering lists, component structure */

function App() {
  
  return (
    <div className="body">
      <data tasks = {data.tasks} />

      <form className="form-tasks">
        <label>Title :
          <input type='text' id="name"></input>
        </label>
        <label>Description : </label>
          <label>
          <textarea name="desc" id="desc" rows="3" cols="30"></textarea>
          </label>
        
        <label>Status :
          <select id="status" name="status">
            <option value="pending">Pending</option>
            <option value="started">Started</option>
            <option value="in progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <label>Priority :
          <select id="priority" name="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
        </label>
        <label>Deadline :
          <input type='date' id="deadline"></input>
        </label>
        <button type="submit">Add task</button>
      </form>
    </div>
  );
}

export default App;
