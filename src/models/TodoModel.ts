import { observable } from 'mobx';

export class TodoModel {

  static nextId = 1;
  static generateId() {
    return this.nextId ++;
  }
  readonly id: number;
  @observable text: string;
  @observable completed: boolean;

  constructor(text: string, completed = false) {
    this.id = TodoModel.generateId();
    this.text = text;
    this.completed = completed;
  }
}

export default TodoModel;
