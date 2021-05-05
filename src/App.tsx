import "./App.css";

import React, { FunctionComponent, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useMutation, useQuery } from "@apollo/client";

import { Todo } from "./interfaces";
import graphqlRequests from "./graphqlRequests";

import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Error from "./components/Error/Error";

const {
  getAllTodosGraphql,
  addTodoGraphql,
  removeTodoGraphql,
  updateTodoGraphql,
} = graphqlRequests;
const App: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
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

  const handleAddTodo = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!input) {
      setError("Type something");
      return;
    }

    addTodo({
      variables: {
        title: { title: input },
      },
    })
      .then(({ data }) => {
        setTodos((prev) => [data.addTodo, ...prev]);
      })
      .catch((err) => setError(err.message));

    setInput("");
  };

  const handleRemoveTodo = (id: string) => {
    removeTodo({
      variables: {
        id: id,
      },
    })
      .then(() => setTodos((prev) => prev.filter((el) => el.id !== id)))
      .catch((err) => setError(err.message));
  };

  const handleToggleTodo = (id: string) => {
    toggleTodo({
      variables: {
        id: id,
      },
    })
      .then(({ data }) => setTodos(data.updateTodo))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    if (!allTodos) {
      return;
    }
    setTodos(allTodos?.getAllTodos);
  }, [allTodos]);

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
      toggleTodoLoading === true
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
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

        <form autoComplete="off" onSubmit={handleAddTodo}>
          <TextField
            id="standard-basic"
            style={{
              width: "100%",
            }}
            label="Add your todo"
            variant="standard"
            color="primary"
            value={input}
            onChange={(evt) => setInput(evt.target.value)}
          />
        </form>
        <CSSTransition
          in={todos.length !== 0}
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
