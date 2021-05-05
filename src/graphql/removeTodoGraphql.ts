import { gql } from "@apollo/client";

const removeTodoGraphql = gql`
  mutation removeTodo($id: ID!) {
    removeTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

export default removeTodoGraphql;
