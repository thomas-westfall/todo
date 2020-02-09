import axios from 'axios';
// ACTION TYPES;
const FETCH_TODOS_DATA = "FETCH_TODOS_DATA";
const RESET_TODOS_DATA = "RESET_TODOS_DATA";

// ACTION CREATOR;
const fetchTodosData = (todos) => {
  console.log(todos)
    return {
        type: FETCH_TODOS_DATA,
        payload: todos
    }
}

const resetTodosData = () => {
  return {
    type: RESET_TODOS_DATA
  }
}

// Thunks go here!
// export const fetchTodosDataThunk = (todos) => async (dispatch) => {
//     dispatch(fetchTodosData(todos));
// }
export const fetchTodosDataThunk = (token) => async dispatch => {

  console.log(token)
  let config = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      "Authorization": token,
    }
  }

  axios.get('https://cors-anywhere.herokuapp.com/https://hunter-todo-api.herokuapp.com/todo-item', config).then(res => {
  dispatch(fetchTodosData(res.data))
  console.log(res.data)
  })
}

export const resetTodosDataThunk = () => (dispatch) => {
  let resolvedActionObject = resetTodosData(); 
  dispatch(resolvedActionObject);
}

// REDUCER FUNCTION;
export default (state = [], action) => {
    switch (action.type) {
        case FETCH_TODOS_DATA:
            return action.payload;
        case RESET_TODOS_DATA:
            return [];
        default:
            return state;
    }
}