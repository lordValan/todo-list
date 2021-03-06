import { FC, memo } from "react";

import TodoItem from './TodoItem/TodoItem';

import { Todo } from "../../interfaces";

interface ListProps {
  todos?: Todo[];
  removeTodo(id: string): void;
  toggleTodo(id: string): void;
  highlighted?: string;
}

const List: FC<ListProps> = ({ todos = [], removeTodo, toggleTodo, highlighted = "" }) => {
  if (!todos || !todos.length) {
    return <div className="addTodos-placeholder">No todos yet!</div>;
  }
  
  return (
    <ul className="todo-list">
      {todos.map((todoItem: Todo) => {
        return (
          <TodoItem
            key={todoItem.id}
            onRemove={removeTodo}
            onToggle={toggleTodo}
            highlighted={highlighted}
            {...todoItem}
          />
        );
      })}
    </ul>
  )
};

export default memo(List);
