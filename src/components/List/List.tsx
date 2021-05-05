import { Checkbox } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { Todo } from "../../interfaces";
import "./List.css";

import setSearchHighlighted from '../../utils/setSearchHighlighted';

interface ListProps {
  todos?: Todo[];
  removeTodo(id: string): void;
  toggleTodo(id: string): void;
}

const List: React.FC<ListProps> = ({ todos, removeTodo, toggleTodo }) => {
  console.log(setSearchHighlighted('ipsum', 'Lorem ipsum'));
  
  if (todos && todos.length !== 0) {
    return (
      <ul className="todo-list">
        {todos.map((el: Todo) => {
          return (
            <ListItem
              key={el.id}
              onClick={() => toggleTodo(el.id)}
              dense
              button
              divider
            >
              <ListItemIcon>
                <Checkbox checked={el.completed} />
              </ListItemIcon>
              <ListItemText
                style={
                  el.completed 
                    ? { textDecoration: "line-through" } 
                    : undefined
                }
                disableTypography
              >
                <span>{el.title}</span>
              </ListItemText>
              <ListItemSecondaryAction onClick={() => removeTodo(el.id)}>
                <IconButton className="delete-button">
                  <DeleteIcon className="delete-icon" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </ul>
    );
  } else {
    return <div className="addTodos-placeholder">No todos yet!</div>;
  }
};

export default List;
