import { gql } from "@apollo/client";

const addTodoGraphql = gql`
  mutation addTodo($title: TodoInput) {
    addTodo(todo: $title) {
      id
      title
      completed
    }
  }
`;

export default addTodoGraphql;
