import React from 'react'
import Todolist from './components/Todolist'
import TodoStore from './TodoStore'

export default class App extends React.Component {
  constructor () {
    super()
    this.store = new TodoStore()
  }
  render () {
    return (
      <div>
        <Todolist store={this.store} />
        <Todolist store={this.store} />
      </div>
    )
  }
}