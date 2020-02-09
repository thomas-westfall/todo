import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class AllTodos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }
    fetchTodo = (todoid) => {
        this.setState({
            selected: this.props.todos.find(todo => todo.id === todoid)
        })
        
    }
    markDone = (e) => {
        e.preventDefault();
        let config = {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "Authorization": this.props.loggeduser.token,
          }
        }
        
        let data = {
          'completed': true
        }
        let url = 'https://cors-anywhere.herokuapp.com/https://hunter-todo-api.herokuapp.com/todo-item'
        url += '\/' + this.state.selected.id
        axios.put(url, data, config).then(res => {
        console.log(res)
        this.props.fetchTodosData(this.props.loggeduser.token)
        this.fetchTodo(this.state.selected.id)
        this.setState(prevState => {
            let selected = Object.assign({}, prevState.selected); 
            selected.completed = true;
            return {selected};  
          })
      }
        )
      }
      deleteTask = (e) =>{
        e.preventDefault();
        let config = {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "Authorization": this.props.loggeduser.token,
          }
        }
        
        let url = 'https://cors-anywhere.herokuapp.com/https://hunter-todo-api.herokuapp.com/todo-item'
        url += '\/' + this.state.selected.id
        axios.delete(url, config).then(res => {
        console.log(res)
        this.props.fetchTodosData(this.props.loggeduser.token)
        this.setState({
            selected: undefined
        })
      }
        )     
      }
    
    render() {
        return (
            <center>
            <div>
            <table className="TodoTable">
                <thead>
                    <tr>
                        <td></td>
                        <td>ID</td>
                        <td>Content</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.todos ?
                    this.props.todos.map((eachTodo) => (
                        !eachTodo.deleted ? (
                        <tr key={eachTodo.id}>
                          <td className="cView">
                          {/* <Link to="/viewtodo" onClick={() => this.fetchTodo(eachTodo.id)} className="bView">View</Link>*/}
                          <button className="bView" onClick={() => this.fetchTodo(eachTodo.id)}>Select</button>
                          {/* <Link className="bView" to="/viewtodo" todoidb={eachTodo.id}>View</Link>*/}
                          {/* <Link to={{ pathname: '/viewtodo/', state: { todoidc: eachTodo.id} }}>View</Link>*/}
                          </td>
                          <td>
                            {eachTodo.id}
                          </td>
                          <td>
                              {eachTodo.content}
                          </td>
                          <td>
                              {eachTodo.completed ?
                              (<>Complete</>) : (<>Incomplete</>) }
                          </td>
                        </tr>) : (<></>)
                              
                      )
                      )
                    :
                    "" }
                    <tr>

                    </tr>
                </tbody>
            </table>
            </div>
            <br></br>
            {this.state.selected ? (
            <div>
                ID: {this.state.selected.id} <br></br>
                Content: {this.state.selected.content} <br></br>
                Status: {this.state.selected.completed ? (<>Complete</>) : (<>Incomplete</>) }<br></br>

                {this.state.selected.completed ? (<></>) : (<><button className="btn btn-primary" onClick={this.markDone}>Mark as done</button></>) }
                
                <button className="btn btn-danger" onClick={this.deleteTask}>Delete</button>
            </div>
            ) : (<></>)
            }
            
            </center>
        )
    }
}

export default AllTodos;