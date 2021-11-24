import "./App.css";
import { useRef } from "react";

const QueueForm = ({ onSubmit, deleteFromQueue }) => {
  const usernameInput = useRef();
  function onFormSubmitted(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    onSubmit(data.get("username"));
usernameInput.current.value = "";
}
  return (
    <div>
      <form onSubmit={onFormSubmitted}>
        <label htmlFor="username">
          Your name :
          <input
            ref={(element) => (usernameInput.current = element)}
            id="username"
            name="username"
          ></input>
          <button type="submit"> ok</button>
        </label>
      </form>
    </div>
  );
};

export default QueueForm;
