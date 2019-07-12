export default class TodoStore {
  constructor () {
    this.todos = []
    this.filter = 'All'
    this.changes = []
  }

  subscribe (cb) {
    this.changes.push(cb)
  }

  inform () {
    console.log(this.changes)
    this.changes.forEach(cb => cb(this))
  }

  addTodo (title) {
    this.todos.push({
      id: this.uniqueId(),
      title,
      completed: false,
      edit: false
    })
    this.inform()
  }

  filteredTodos () {
    switch (this.filter) {
      case 'All':
        return this.todos
      case 'Done':
        return this.todos.filter(t => t.completed)
      case 'Todo':
        return this.todos.filter(t => !t.completed);
      default:
        break
    } 
  }

  editTodo (todo) {
    this.todos = this.todos.map(t => t === todo ? {...t, edit: !t.edit} : t)
    this.inform()
  }

  updateTodo (todo, title) {
    this.todos = this.todos.map(t => t === todo ? {...t, title, edit: false} : t)
    this.inform()
  }

  removeTodo (todo) {
    this.todos = this.todos.filter(t => t !== todo)
    this.inform()
  }

  toggleComplete (todo) {
    this.todos = this.todos.map(t => t === todo ? {...t, completed: !t.completed} : t)
    this.inform()
  }

  uniqueId () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }

  setFilter (filter) {
    this.filter = filter
    this.inform()
  }

}