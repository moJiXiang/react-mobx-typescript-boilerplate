import * as React from 'react';
import { TodoModel } from 'src/models';
import { TodoTextInput } from '../TodoTextInput';

export interface ITodoActions {
  editTodo: (id: number, data: Partial<TodoModel>) => any;
  deleteTodo: (id: number) => any;
}

export interface ITodoProps extends ITodoActions {
  todo: TodoModel;
}

export interface ITodoState {
  editing: boolean;
}

export class TodoItem extends React.Component<ITodoProps, ITodoState> {
  state: ITodoState = {
    editing: false,
  };

  render() {
    const { todo } = this.props;

    const element  = this.state.editing ? (
      <TodoTextInput
        text={todo.text}
        editing={this.state.editing}
        onSave={(text) => this.updateTodo({ text })}
      />
    ) : (
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={this.handleToggleCheckbox}
        />
        <span>{todo.text}</span>
        <button onClick={this.handleClickDeleteButton}>x</button>
      </div>
    );

    return <li>{element}</li>;
  }

  private handleToggleCheckbox = (e) => {
    const checked = e.target.checked;
    this.updateTodo({ completed: checked });
  }

  private handleClickDeleteButton = (e) => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  }

  private updateTodo = (data: Partial<TodoModel>) => {
    const { todo } = this.props;
    if (data.text !== undefined && data.text.trim().length === 0) {
      this.props.deleteTodo(todo.id);
    } else {
      this.props.editTodo(todo.id, data);
    }
    this.setState({ editing: false });
  }
}
