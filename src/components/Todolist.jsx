import React from 'react'

export default class Todolist extends React.Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
    this.state = {
      todos: this.store.filteredTodos()
    }
    this.store.subscribe(store => {
      this.setState({
        todos: store.filteredTodos()
      })
    })
  }

  handleNewTodo (e) {
    if (e.key === 'Enter' && e.target.value) {
      this.store.addTodo(e.target.value)
      e.target.value = ''
    }
  }

  handleRemoveTodo (todo) {
    this.store.removeTodo(todo)
  }

  handleComplete (todo, e) {
    this.store.toggleComplete(todo)
  }

  handleChangeFilter (filter) {
    this.store.setFilter(filter)
  }

  handleEditTodo (todo) {
    this.store.editTodo(todo)
  }
  
  handleUpdateTodo (todo, e) {
    if (e.key === 'Enter' && e.target.value) {
      this.store.updateTodo(todo, e.target.value)
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div>
          <h1>Todolist</h1>
          <input type="text" className="form-control" placeholder="new todo" onKeyPress={this.handleNewTodo.bind(this)} />
          <div className="text-center mt-2">
            <a href="#e" onClick={this.handleChangeFilter.bind(this, 'All')} className={this.store.filter === 'All' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}>All</a>
            <a href="#e" onClick={this.handleChangeFilter.bind(this, 'Done')} className={this.store.filter === 'Done' ? 'btn btn-outline-primary mx-2 active' : 'btn btn-outline-primary mx-2'}>Done</a>
            <a href="#e" onClick={this.handleChangeFilter.bind(this, 'Todo')} className={this.store.filter === 'Todo' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}>Todo</a>
          </div>
        </div>
        <hr/>
        <div>
          <ul className="list-group">
            {
              this.state.todos.map(todo => (
                <li className={todo.completed ? 'list-group-item bg-success' : 'list-group-item'} key={todo.id}>
                  <input type="checkbox" name="" id="" className="mr-5" onChange={this.handleComplete.bind(this, todo)} checked={todo.completed}/>
                  {
                    todo.edit ? (
                      <input type="text" className="form-control" defaultValue={todo.title} onKeyPress={this.handleUpdateTodo.bind(this, todo)} />
                    ) : (
                        <span onDoubleClick={this.handleEditTodo.bind(this, todo)}>{todo.title}</span>
                    )
                  }
                  <button type="button" className="close" aria-label="Close" onClick={this.handleRemoveTodo.bind(this, todo)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}