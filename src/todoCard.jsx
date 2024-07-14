import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import GitHubIcon from "@mui/icons-material/GitHub";

const TodoCard = () => {
  const [todo, setTodo] = useState("");
  const [todolist, setTodoList] = useState([]);
  const [isInputOk, setIsInputOk] = useState(false);

  useEffect(() => {
    //sets the todolist array to a new storedTodos variable
    const storedTodos = localStorage.getItem("todolist");
    //returns the array as if storedTodos exists
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
  }, []);

  const handlePostTodo = (e) => {
    e.preventDefault();
    if (todo.length > 0) {
      // sets id and todo object to newTodo variable
      const newTodo = { id: Date.now(), todo };
      // spread todolist, add newTodo and return new array and set equal to updatedTodoList
      const updatedTodoList = [...todolist, newTodo];
      // set todo list to updatedTodo
      setTodoList(updatedTodoList);
      //sets updatedTodoList to the todolist variable
      localStorage.setItem("todolist", JSON.stringify(updatedTodoList));
      //clears input field
      setTodo("");
      setIsInputOk(false);
    } else {
      //shows error if nothing is entered in the input field
      setIsInputOk(true);
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todolist.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoList));
  };

  return (
    <div className="flex flex-col items-center border-1 border-[#27272A] border p-3 w-[33rem] rounded-lg scale-75 lg:scale-100 md:scale-100">
      <div className="flex flex-row justify-between w-[95%] items-center">
        <h1 className="text-2xl font-medium text-left text-white">
          To-Do List
        </h1>
        <div className="flex flex-row gap-2 text-[#A1A1AA] hover:text-white duration-300 ease-in-out">
          <a
            href="https://github.com/ParshvLimbad"
            className="flex flex-row gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>By Parshv Limbad</p>
            <GitHubIcon />
          </a>
        </div>
      </div>
      <form
        onSubmit={handlePostTodo}
        className="flex flex-row gap-2 w-[30rem] h-[2.5rem] mb-3 mt-3"
      >
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="w-[80%] rounded-[4px] px-2 border border-1 border-[#27272A] outline-none focus:border-gray-800 hover:border-gray-800 duration-300 ease-in-out bg-black text-[#fafafa]"
          autoFocus
          maxLength="40"
        />
        <button
          type="submit"
          className="bg-[#FAFAFA] text-black px-2 py-1 rounded-[6px] hover:bg-[#E2E2E2] duration-300 ease-in-out"
        >
          Add Todo
        </button>
      </form>
      <div className="max-h-[20rem] overflow-y-auto overflow-y-none w-[31rem] no-scrollbar scrollbar flex justify-center">
        <ul>
          {todolist.map((listItem) => (
            <div
              key={listItem.id}
              className="flex flex-row w-[30rem] p-2 border-1 border-[#27272A] border mb-3 justify-between rounded-md text-[#fafafa]"
            >
              <li>{listItem.todo}</li>
              <button onClick={() => handleDeleteTodo(listItem.id)}>
                <CheckIcon className="hover:color-green-500" />
              </button>
            </div>
          ))}
          {isInputOk && (
            <p className="text-red-400">Please enter a todo to get started</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoCard;
