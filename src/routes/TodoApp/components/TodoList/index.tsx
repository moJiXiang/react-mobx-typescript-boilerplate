import { observer } from 'mobx-react';
import * as React from 'react';
import { TodoModel } from 'src/models/TodoModel';
import { ITodoActions, TodoItem } from 'src/routes/TodoApp/components/TodoItem';

export interface ITodoListProps extends ITodoActions {
  todos: TodoModel[];
  completeAll: () => any;
}

export interface ITodoListState {}

export const TodoList = observer((props) => {
  const { todos, ...actions } = props;
  if (props.todos.length === 0) {
    return (
      <div>No todos here.</div>
    );
  }

  return (
    <section>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            {...actions}
          />
        ))}
      </ul>
    </section>
  );
});

// @observer
// export class TodoList extends React.Component<ITodoListProps, ITodoListState> {
//   constructor(props: ITodoListProps) {
//     super(props);
//   }

//   render() {
//     const {todos, ...actions} = this.props;
//     return (
//       <section>
//         <ul>
//           {todos.map((todo) => (
//             <TodoItem
//               key={todo.id}
//               todo={todo}
//               {...actions}
//             />
//           ))}
//         </ul>
//       </section>
//     );
//   }
// }
