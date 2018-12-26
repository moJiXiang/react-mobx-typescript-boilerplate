import { observer } from 'mobx-react';
import * as React from 'react';

import {
  TODO_FILTER_TITILES, TODO_FILTER_TYPES, TodoFilter,
} from 'src/constants';

export interface IFooterProps {
  filter: TodoFilter;
  activeCount: number;
  completedCount: number;
  onChangeFilter: (filter: TodoFilter) => any;
  onClearCompleted: () => any;
}

export interface IFooterState {

}

@observer
export class Footer extends React.Component<IFooterProps, IFooterState> {

  render() {
    return (
      <footer>
        {this.renderTodoCount()}
        <ul>
            {TODO_FILTER_TYPES.map((filter) => (
              <li key={filter} children={this.renderFilterLink(filter)}></li>
            ))}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }

  private renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';
    return (
      <span>
        <strong>{activeCount || 'No'}</strong>{itemWord} left
      </span>
    );
  }

  private renderFilterLink(filter: TodoFilter) {
    const title = TODO_FILTER_TITILES[filter];
    const {  onChangeFilter } = this.props;
    return (
      <a onClick={() => onChangeFilter(filter)}>{title}</a>
    );
  }

  private renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button onClick={onClearCompleted}>clear completed</button>
      );
    }
    return;
  }
}
