import axios from 'axios';
// ACTION TYPES;
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const ERROR = "ERROR";

// ACTION CREATOR;
const logIn = (user) => {
    return {
        type: LOG_IN,
        payload: user
    }
}
const logOut = () => {
    return {
        type: LOG_OUT,
    }
}

const error = (err) => {
    return {
        type: ERROR,
        payload: err
    }
}
// Thunks
export const logInThunk = (user) => async (dispatch) => {
    let res;
    try {
        console.log(user);
         res = await axios.post(`https://cors-anywhere.herokuapp.com/https://hunter-todo-api.herokuapp.com/auth`, {
            withCredentials: true,
            "username": user.username,
        })
    }
    catch (authError) {
        return dispatch(error({authError}));
    }

    try {
        this.props.fetchTodosData(res.data.token)
    }
    catch(err){
        console.error(err)
    }
    try {
        console.log(res.data, "THIS IS OUR INITIAL DATA");
        dispatch(logIn(res.data));
    }
    catch (dispatchOrHistoryErr) {
        console.error(dispatchOrHistoryErr)
    }
}

export const logOutThunk = () => async (dispatch) => {

        dispatch(logOut());
    

}

// REDUCER FUNCTION;
export default (state = {}, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.payload;
        case LOG_OUT:
            return {};
        case ERROR:
            return action.payload;
        default:
            return state;
    }
}