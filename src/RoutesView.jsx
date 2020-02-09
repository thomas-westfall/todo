import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {registerUserThunk} from "./store/utilities/users";
import {logInThunk, logOutThunk} from "./store/utilities/loggeduser";
import {fetchTodosDataThunk} from "./store/utilities/todos";

//PAGE IMPORTS
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AccessDenied from './components/AccessDenied';
import CreateTodo from './components/CreateTodo';

class RoutesView extends Component {

  componentDidMount() {
  }

  render() {
    const { isLoggedIn } = this.props;
    console.log('RENDERING')
    const HomeComponent = () => (<HomePage todos={this.props.todos} loggeduser={this.props.loggeduser} fetchTodosData={this.props.fetchTodosData}/>);
    const LoginComponent = () => (<LoginPage logIn={this.props.logIn} isLoggedIn={this.props.isLoggedIn} error={this.props.error} fetchTodosData={this.props.fetchTodosData} />);
    const RegisterComponent = () => (<RegisterPage/>);
    const CreateTodoComponent = () => (<CreateTodo loggeduser={this.props.loggeduser} todos={this.props.todos} fetchTodosData={this.props.fetchTodosData}/>);
    const DeniedComponent = () => (<AccessDenied />)

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={LoginComponent} />
          <Route exact path="/login" render={LoginComponent} />
          <Route exact path="/register" render={RegisterComponent} />
          {isLoggedIn && (
          <Switch>
            <Route exact path="/home" render={HomeComponent} />
            <Route exact path="/create" render={CreateTodoComponent} />
          </Switch>
          )}
          <Route component={DeniedComponent} />
        </Switch>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    loggeduser: state.loggeduser,
    error: state.loggeduser.response,
    isLoggedIn: state.loggeduser.token,
    todos: state.todos
  }
}

const mapDispatch = (dispatch) => {
  return {
    registerUser: (user) => dispatch(registerUserThunk(user)),
    logIn: (user) => dispatch(logInThunk(user)),
    logOut: () => dispatch(logOutThunk()),
    fetchTodosData: (token) => dispatch(fetchTodosDataThunk(token)),
  }
}
export default connect(mapState, mapDispatch)(RoutesView);