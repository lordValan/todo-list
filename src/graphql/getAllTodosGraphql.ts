import { gql } from "@apollo/client";

const getAllTodosGraphql = gql`
  query {
    getAllTodos {
      id
      title
      completed
    }
  }
`;

export default getAllTodosGraphql;
