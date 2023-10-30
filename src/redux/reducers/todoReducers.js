import axios from "axios";

const initialValue = {
  todos: [],
  isLoading: false,
  error: "",
  activeFilter: "all",
};

function todoReducer(state = initialValue, action) {
  switch (action.type) {
    case "delete_todo_success":
      const filterTodo = state.todos.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        todos: filterTodo,
      };

    case "start_fetching":
      return {
        ...state,
        isLoading: true,
      };

    case "success_get_todo":
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case "update_todo_success":
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            value: action.payload.value,
            checked: action.payload.checked,
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };

    case "set_filter":
      return {
        ...state,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
}

function startFetching() {
  return {
    type: "start_fetching",
  };
}

function successGetTodo(data) {
  return {
    type: "success_get_todo",
    payload: data,
  };
}

function deleteTodoSuccess(id) {
  return {
    type: "delete_todo_success",
    payload: id,
  };
}

export const addTodo = (newTodo) => async (dispatch) => {
  dispatch(startFetching());

  await axios.post(
    "https://653f42d39e8bd3be29e02099.mockapi.io/todo",
    newTodo
  );

  dispatch(getTodo());
};

export const deleteTodo = (data) => async (dispatch) => {
  dispatch(startFetching());

  await axios.delete(
    `https://653f42d39e8bd3be29e02099.mockapi.io/todo/${data}`
  );
  dispatch(deleteTodoSuccess(data));
  dispatch(getTodo());
};

export function getTodo() {
  return async function (dispatch) {
    dispatch(startFetching());

    const { data } = await axios("https://653f42d39e8bd3be29e02099.mockapi.io/todo");

    dispatch(successGetTodo(data));
  };
}

export function filterTodoList(filter) {
  return async function (dispatch) {
    dispatch(startFetching());

    let url = `https://653f42d39e8bd3be29e02099.mockapi.io/todo`;

    if (filter === "active") {
      url = `https://653f42d39e8bd3be29e02099.mockapi.io/todo?checked=false`;
    } else if (filter === "completed") {
      url = `https://653f42d39e8bd3be29e02099.mockapi.io/todo?checked=true`;
    }

    const { data } = await axios(url);

    dispatch(successGetTodo(data));
  };
}


export const updateTodo = (id, value, checked) => async (dispatch) => {
  dispatch(startFetching());

  await axios.put(
    `https://653f42d39e8bd3be29e02099.mockapi.io/todo/${id}`,
    { value, checked }
  );

  dispatch(updateTodoSuccess(id, value, checked));
  dispatch(getTodo());
};

export function updateTodoSuccess(id, value, checked) {
  return {
    type: "update_todo_success",
    payload: { id, value, checked },
  };
}

export const setFilter = (filter) => {
  return {
    type: "set_filter",
    payload: filter,
  };
};

export default todoReducer;