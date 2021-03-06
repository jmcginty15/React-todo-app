import { useState } from 'react';
import './NewTodoForm.css';

const NewTodoForm = ({ addItem }) => {
    const [input, setInput] = useState('');

    function handleChange(evt) {
        const newInput = evt.target.value;
        setInput(newInput);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (input) {
            addItem(input);
            setInput('');
        }
    }

    return (
        <div className="NewTodoForm">
            <form onSubmit={handleSubmit}>
                <input name="task" data-testid="new-todo-input" type="text" placeholder="enter a new todo item" value={input} onChange={handleChange} required></input>
                <button className="NewTodoForm-submit">Add</button>
            </form>
        </div>
    )
}

export default NewTodoForm;