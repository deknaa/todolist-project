import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/reducers/todoReducers";

function InputTodo() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    console.log(input);
    let newTodo = {
      value: input,
      status: false,
    };
    dispatch(addTodo(newTodo));
    setInput("");
  };

  return (
      <div className="grid grid-cols-6 mb-2">
        <div className="col-start-2 col-span-4">
        <form>
          <div className="flex items-center  space-x-2">
            <input
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-xl"
              type="text"
              placeholder="Input To Do List..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="px-4 py-2 text-white bg-lime-600 rounded-lg shadow-xl hover:bg-lime-700 focus:outline-none"
              onClick={handleClick}
            >
              Add
            </button>
          </div>
        </form>
        </div>
      </div>
  );
}

export default InputTodo;