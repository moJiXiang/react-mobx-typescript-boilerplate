import { action, computed, observable } from 'mobx';
import { TodoModel } from 'src/models';

export class TodoStore {

  @observable todos: TodoModel[];

  constructor(fixtures?: TodoModel[]) {
    this.todos = fixtures || [];
  }

  @computed
  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  @computed
  get completedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  @action
  addTodo = (item: Partial<TodoModel>): void => {
    console.log(item);
    this.todos.push(new TodoModel(item.text as string, item.completed as boolean));
    console.log(this.todos);
  }

  @action
  editTodo = (id: number, data: TodoModel): void => {
    console.log(id, data);
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        if (typeof data.completed === 'boolean') {
          todo.completed = data.completed;
        }
        if (typeof data.text === 'string') {
          todo.text = data.text;
        }
      }
      return todo;
    });
  }

  @action
  deleteTodo = (id: number): void => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  @action
  completeAll = (): void => {
    this.todos = this.todos.map((todo) => ({ ...todo, completed: true }));
  }

  @action
  clearCompleted = (): void => {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }
}
