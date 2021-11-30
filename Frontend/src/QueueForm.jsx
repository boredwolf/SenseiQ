import "./App.css";
import { useRef } from "react";

const QueueForm = ({ className, onSubmit }) => {
  const usernameInput = useRef();
  function onFormSubmitted(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    onSubmit(data.get("username"));
usernameInput.current.value = "";
}
  return (
    <div className="container mx-auto ">
      <form  className={className} onSubmit={onFormSubmitted}>
        <label className="sr-only" htmlFor="username">
          Your name :
          </label>
          <input
          className="p-8 text-2xl rounded-full text-gray-600 bg-opacity-40 bg-white my-8 text-center "
          placeholder="Enter your name"
            ref={(element) => (usernameInput.current = element)}
            id="username"
            name="username"
          ></input>
          <button  className="  mt-4  ml-0 sm:mt-0 block w-full sm:w-auto sm:inline ml-4  bg-white text-red-400 rounded-full p-8  hover:text-red-800 transition duration-500 ease-out transform hover:scale-110"type="submit"> OK</button>
        
      </form>
    </div>
  );
};

export default QueueForm;
