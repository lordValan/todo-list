import { 
    Checkbox, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, 
    IconButton
} from "@material-ui/core";
import { Delete as DeleteIcon } from '@material-ui/icons';

import { Todo } from "../../../interfaces";

interface Props extends Todo {
    onRemove(id: string): void;
    onToggle(id: string): void;
}

const TodoItem: React.FC<Props> = ({ id, completed, title, onRemove, onToggle }) => {
    return (
        <ListItem
          key={id}
          onClick={() => onToggle(id)}
          dense
          button
          divider
        >
          <ListItemIcon>
            <Checkbox checked={completed} />
          </ListItemIcon>
          <ListItemText
            style={
              completed 
                ? { textDecoration: "line-through" } 
                : undefined
            }
            disableTypography
          >
            <span>{title}</span>
          </ListItemText>
          <ListItemSecondaryAction onClick={() => onRemove(id)}>
            <IconButton className="delete-button">
              <DeleteIcon className="delete-icon" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
}

export default TodoItem;
