import { FC, useState, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { useMutation, useQuery } from "@apollo/client";
import { debounce } from "debounce";

import LinearProgress from "@material-ui/core/LinearProgress";

import { Todo } from "../../interfaces";
import {
  getAllTodosGraphql,
  addTodoGraphql,
  removeTodoGraphql,
  updateTodoGraphql,
} from '../../graphql';

import Header from "../Header/Header";
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import SearchTodoInput from '../SearchTodoInput/SearchTodoInput';
import List from "../List/List";
import Error from "../Error/Error";

import "./App.css";

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

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

      setTodos((prev) => prev.filter((el: Todo) => el.id !== id));
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

  const handleSearchChange = useCallback(debounce((newSearchInput: string) => {
    if (newSearchInput.length > 2) {
      setSearchInput(newSearchInput);
      setTodos((prev: Todo[]) => prev.filter((el: Todo) => el.title.toLowerCase().includes(newSearchInput)));

      return;
    }
    
    setSearchInput("");
    setTodos(allTodos?.getAllTodos);
  }, 300), [getAllTodosLoading]);

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
        <div className='inputs-container'>
          <AddTodoForm onFormSubmit={handleAddTodo} />
          <SearchTodoInput onChange={handleSearchChange} />
        </div>
        <CSSTransition
          in={todos.length > 0}
          timeout={250}
          classNames="transition-list"
        >
          <List
            todos={todos}
            removeTodo={handleRemoveTodo}
            toggleTodo={handleToggleTodo}
            highlighted={searchInput}
          />
        </CSSTransition>
      </div>
    </>
  );
};

export default App;
