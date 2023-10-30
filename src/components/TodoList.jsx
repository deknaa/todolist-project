import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getTodo, updateTodo } from "../redux/reducers/todoReducers";

function TodoList() {
  const dispatch = useDispatch();
  const { isLoading, todos } = useSelector((state) => state.todo);

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id, value) => {
    setEditId(id);
    setEditValue(value);
    setIsEditing(true);
  };

  const handleSaveEdit = (id) => {
    dispatch(updateTodo(id, editValue));
    setEditId(null);
    setEditValue("");
    setIsEditing(false);
  };

  const handleToggleCheck = (id, value, checked) => {
    dispatch(updateTodo(id, value, checked));
  };
  
  return (
    <div className="grid grid-cols-6 mb-2">
      <div className="col-start-2 col-span-4">
    <div>
      {isLoading ? (
        <div className="text-l text-gray-600">loading...</div>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            className="w-full mb-2 p-2 bg-white rounded-lg shadow-sm text-black"
          >
            {editId === todo.id ? (
              <div className="flex space-x-2">
                <input
                  className="w-full p-2 border rounded-lg bg-gray-300 focus:outline-none focus:border-blue-300 "
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button
                  className="px-3 py-2 text-white bg-lime-600 rounded-lg hover:bg-lime-700 focus:outline-none"
                  onClick={() => handleSaveEdit(todo.id)}
                >
                  ✔️
                </button>
              </div>
            ) : (
              <div className="flex px-2 space-x-4">
                <input
                className="flex-none hover:cursor-pointer"
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() =>
                    handleToggleCheck(todo.id, todo.value, !todo.checked)
                  }
                />
                <span
                  className={`flex-1 w-100 text-lg ${
                    todo.checked ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.value}
                </span>
                {!isEditing && (
                  <div className="flex-none space-x-2">
                    <button
                      className="px-1 py-1 text-white bg-white rounded-lg hover:bg-gray-200 focus:outline-none"
                      onClick={() => handleEdit(todo.id, todo.value)}
                    >
                      ✏️
                    </button>
                    <button
                      className="px-1 py-1 text-white bg-white rounded-lg hover:bg-gray-200 focus:outline-none"
                      onClick={() => handleDelete(todo.id)}
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
    </div>
    </div>
  );
}

export default TodoList;