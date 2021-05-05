import { FC, useState, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { useMutation, useQuery } from "@apollo/client";

import LinearProgress from "@material-ui/core/LinearProgress";

import { Todo } from "./interfaces";
import graphqlRequests from "./graphqlRequests";

import Header from "./components/Header/Header";
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import List from "./components/List/List";
import Error from "./components/Error/Error";

import "./App.css";

const {
  getAllTodosGraphql,
  addTodoGraphql,
  removeTodoGraphql,
  updateTodoGraphql,
} = graphqlRequests;

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: allTodos, loading: getAllTodosLoading } = useQuery(
    getAllTodosGraphql
  );

  const [addTodo, { loading: addTodoLoading }] = useMutation(addTodoGraphql);
  const [removeTodo, { loading: removeTodoLoading }] = useMutation(
    removeTodoGraphql
  );
  const [toggleTodo, { loading: toggleTodoLoading }] = useMutation(
    updateTodoGraphql
  );

  // handlers

  const handleAddTodo = useCallback(async (input: string) => {
    if (!input) {
      setError("Type something");
      return;
    }

    try {
      const { data } = await addTodo({
        variables: {
          title: { title: input },
        },
      });

      setTodos((prev) => [data.addTodo, ...prev]);
    } catch (err) {
      setError(err.message)
    }
  }, [addTodo]);

  const handleRemoveTodo = useCallback(async (id: string) => {
    try {
      await removeTodo({
        variables: {
          id: id,
        },
      });

      setTodos((prev) => prev.filter((el) => el.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, [removeTodo]);

  const handleToggleTodo = useCallback(async (id: string) => {
    try {
      const { data } = await toggleTodo({
        variables: {
          id: id,
        },
      })
      
      setTodos(data.updateTodo);
    } catch (err) {
      setError(err.message)
    }
  }, [toggleTodo]);

  // effects

  useEffect(() => {
    if (!allTodos) {
      return;
    }
    
    setTodos(allTodos?.getAllTodos);
  }, [getAllTodosLoading]);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 6000);
    }
  }, [error]);

  useEffect(() => {
    if (
      addTodoLoading ||
      removeTodoLoading ||
      getAllTodosLoading ||
      toggleTodoLoading
    ) {
      return setLoading(true);
    }  
    
    setLoading(false);
  }, [
    addTodoLoading,
    removeTodoLoading,
    getAllTodosLoading,
    toggleTodoLoading,
  ]);

  return (
    <>
      {loading ? <LinearProgress className="loader" /> : null}
      <div className="container">
        <Header />
        <Error error={error} />
        <AddTodoForm onFormSubmit={handleAddTodo} />
        <CSSTransition
          in={todos.length > 0}
          timeout={250}
          classNames="transition-list"
        >
          <List
            todos={todos}
            removeTodo={handleRemoveTodo}
            toggleTodo={handleToggleTodo}
          />
        </CSSTransition>
      </div>
    </>
  );
};

export default App;
