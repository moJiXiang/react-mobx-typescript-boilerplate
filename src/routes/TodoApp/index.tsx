import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { STORE_ROUTER, STORE_TODO, TODO_FILTER_LOCATION_HASH, TodoFilter } from 'src/constants';
import { Header } from 'src/routes/TodoApp/components/Header';
import { TodoList } from 'src/routes/TodoApp/components/TodoList';
import { RouterStore, TodoStore } from 'src/stores';
import { Footer } from './Footer';

export interface ITodoAppProps extends RouteComponentProps {}

export interface ITodoAppState {
  filter: TodoFilter;
}

@inject(STORE_TODO, STORE_ROUTER)
@observer
export default class TodoApp extends React.Component<ITodoAppProps, ITodoAppState> {
  state = {
    filter: TodoFilter.All,
  };

  componentWillMount() {
    this.checkLocationChange();
  }

  componentWillReceiveProps(nextProps: ITodoAppProps) {
    this.checkLocationChange();
  }

  render() {
    const todoStore = this.props[STORE_TODO] as TodoStore;
    const { filter } = this.state;
    const filteredTodos = this.getFilteredTodo(filter);

    const footer = todoStore.todos.length && (
      <Footer
        filter={filter}
        activeCount={todoStore.activeTodos.length}
        completedCount={todoStore.completedTodos.length}
        onClearCompleted={todoStore.clearCompleted}
        onChangeFilter={this.handleFilter}
      />
    );

    return (
      <div>
        <Header addTodo={todoStore.addTodo}/>
        <TodoList
          todos={filteredTodos}
          completeAll={todoStore.completeAll}
          deleteTodo={todoStore.deleteTodo}
          editTodo={todoStore.editTodo}
        />
        {footer}
      </div>
    );

  }

  private checkLocationChange() {
    const router = this.props[STORE_ROUTER] as RouterStore;
    const filter = Object.keys(TODO_FILTER_LOCATION_HASH)
      .map((key) => Number(key) as TodoFilter)
      .find((filter) => TODO_FILTER_LOCATION_HASH[filter] === router.location.hash);

    if (filter !== undefined) {
      this.setState({ filter });
    }
  }

  private handleFilter = (filter: TodoFilter) => {
    const router = this.props[STORE_ROUTER] as RouterStore;
    const currentHash = router.location.hash;
    const nextHash = TODO_FILTER_LOCATION_HASH[filter];
    if (currentHash !== nextHash) {
      router.replace(nextHash);
    }
  }

  private getFilteredTodo(filter: TodoFilter) {
    const todoStore = this.props[STORE_TODO] as TodoStore;
    switch (filter) {
      case TodoFilter.ACTIVE:
        return todoStore.activeTodos;
      case TodoFilter.COMPLETED:
        return todoStore.completedTodos;
      default:
        return todoStore.todos;
    }
  }
}
