import React from 'react';
import LSManager from './lsmanager';

export default class App extends React.Component {
  state = {
    todoName: '',
    todos: [
      {
        id: 1,
        name: 'Todo 1',
        liked: false
      }
    ]
  }
  renderTodos(item, idx) {
    return (
      <li key={ idx }>
        { item.name }
        <button style={{"background": "none", "border": "none", "cursor": "pointer"}} onClick={ this.likeTodo.bind(this, idx) }><span style={{ "color": item.liked === true ? "#5f5" : "#000" }}>Like</span></button>
        <button style={{"background": "none", "border": "none", "cursor": "pointer"}} onClick={ this.deleteTodo.bind(this, idx) }><span style={{"color":"#f55"}}>Delete</span></button>
        <button style={{"background": "none", "border": "none", "cursor": "pointer"}} onClick={ this.editTodo.bind(this, idx) }><span style={{"color":"#55f"}}>Edit</span></button>
      </li>
    );
  }
  inputChange(evt) {
    const v = evt.target.value;
    this.setState({todoName:v});
  }
  componentWillMount() {
    this.getLS();
  }
  addTodo() {
    if (this.state.todoName === '' || this.state.todoName === ' ') return;

    const id = this.state.todos[0]
    ? this.state.todos[this.state.todos.length - 1].id + 1
    : 1;
    const name = this.state.todoName;

    const { todos } = this.state;
    todos.push({ id, name, liked: false });

    this.setState({ todos });
    this.setState({ todoName: '' });
    this.saveLS();
  }
  deleteTodo(idx) {
    if (!window.confirm('Delete todo?')) return;
    const { todos } = this.state;
    todos.splice(idx, 1);
    this.setState({ todos });
    this.saveLS();
  }
  editTodo(idx) {
    const { todos } = this.state;
    const text = prompt('Edit todo:', todos[idx].name);
    if (!text) return;

    todos[idx].name = text;
    this.setState({ todos });
    this.saveLS();
  }
  likeTodo(idx) {
    const { todos } = this.state;
    todos[idx].liked = !todos[idx].liked;

    this.setState({ todos });
    this.saveLS();
  }
  saveLS() {
    const ls = new LSManager();
    ls.set('todos', JSON.stringify(this.state.todos));
  }
  getLS() {
    const ls = new LSManager();
    const data = JSON.parse(ls.get('todos'));
    console.log(data);
    if (data) this.setState({ todos: data });
  }
  render() {
    return (
      <div>
        <input value={ this.state.todoName } onChange={ this.inputChange.bind(this) } />
        <button onClick = { this.addTodo.bind(this) }>Add todo</button>
        <ul>
          { this.state.todos.map(this.renderTodos.bind(this)) }
        </ul>
      </div>
    );
  }
}
