import { gql } from "@apollo/client";

const updateTodoGraphql = gql`
  mutation updateTodo($id: ID!) {
    updateTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

export default updateTodoGraphql;
