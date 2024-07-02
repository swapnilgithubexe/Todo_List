import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import axios from "axios";
import { BsCircleFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="home">
      <h2>To-Do List</h2>
      <Tasks />
      {todos.length === 0 ? (
        <div>
          <h2>Empty List</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={index} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.status ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.status ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
