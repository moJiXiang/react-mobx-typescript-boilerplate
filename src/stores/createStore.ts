import { History } from 'history';
import { STORE_ROUTER, STORE_TODO } from 'src/constants';
import { TodoModel } from 'src/models';
import { RouterStore } from './RouterStore';
import { TodoStore } from './TodoStore';

export function createStore(history: History, defaultTodos?: TodoModel[]) {
  const todoStore = new TodoStore(defaultTodos);
  const routerStore = new RouterStore(history);
  return {
    [STORE_TODO]: todoStore,
    [STORE_ROUTER]: routerStore,
  };
}
