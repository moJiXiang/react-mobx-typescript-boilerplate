import * as React from 'react';

export interface ITodoTextInputProps {
  text?: string;
  placeholder?: string;
  newTodo?: boolean;
  editing?: boolean;
  onSave: (text: string) => any;
}

export interface ITodoTextInputState {
  text: string;
}

export class TodoTextInput extends React.Component<ITodoTextInputProps, ITodoTextInputState> {
  state: ITodoTextInputState = {
    text: this.props.text || '',
  };

  render() {
    return (
      <input
        type="text"
        autoFocus
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }

  private handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  private handleSubmit = (e) => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }
}
