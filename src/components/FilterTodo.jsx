import { useDispatch } from "react-redux";
import { filterTodoList, setFilter } from "../redux/reducers/todoReducers";

function FilterTodo() {
  const dispatch = useDispatch();

  const handleFilterClick = (filter) => {
    dispatch(setFilter(filter));
    dispatch(filterTodoList(filter));
  };

  return (
    <div className="grid grid-cols-6 mb-6">
      <div className="col-start-2 col-span-4">
        <div className="flex items-center space-x-2 text-xs mt-5 mb-5">
          <button
            className="px-10 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none"
            onClick={() => handleFilterClick("all")}
          >
            📃 All
          </button>
          <button
            className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 focus:outline-none"
            onClick={() => handleFilterClick("active")}
          >
            🕑 Active
          </button>
          <button
            className="px-6 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 focus:outline-none"
            onClick={() => handleFilterClick("completed")}
          >
            ✅ Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterTodo;