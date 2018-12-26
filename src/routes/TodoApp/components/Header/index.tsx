import * as React from 'react';
import { TodoModel } from 'src/models';
import { TodoTextInput } from 'src/routes/TodoApp/components/TodoTextInput';

export interface IHeaderProps {
  addTodo: (todo: Partial<TodoModel>) => any;
}

export interface IHeaderState {}

export class Header extends React.Component<IHeaderProps, IHeaderState> {

  render() {
    return (
      <header>
        <h1>Todos111111</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
  private handleSave = (text: string) => {
    console.log('text: ', text);
    if (text.length) {
      this.props.addTodo({ text });
    }
  }
}
