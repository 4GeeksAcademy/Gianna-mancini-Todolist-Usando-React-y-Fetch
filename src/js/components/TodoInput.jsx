import { useState } from "react";

const TodoInput = (props) => {
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState("")

    function handleEnterPress(e) {
   if (e.key !== 'Enter') return
   if (!inputValue.trim() || (inputValue.length <= 3)) {
    setInputError("Debe haber mas de 3 caracteres") 
    return;
   } 
   else {
    setInputError("")
   }

   props.onAddTodo(inputValue)
   setInputValue("")
}
    return (
        <div className="py-3">
            <input type="text" placeholder="What needs to be done?" className="form-control input-todo shadow-none"
            value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => handleEnterPress(e)} />
            <p className="error-text todo-item">{inputError}</p>
        </div>
    ); 
};

export default TodoInput;