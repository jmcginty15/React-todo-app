import { useState } from 'react';
import './Todo.css';

const Todo = ({ id, task, complete, handleRemove, handleEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [input, setInput] = useState(task);

    function handleRemoveClick() {
        handleRemove(id);
    }

    function showEditForm() {
        setIsEditing(true);
    }

    function handleChange(evt) {
        const newInput = evt.target.value;
        setInput(newInput);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const newTask = input;
        setIsEditing(false);
        setInput(newTask);
        handleEdit(id, newTask);
    }

    function cancelEdit() {
        setIsEditing(false);
        setInput(task);
    }

    if (isEditing) return (
        <div className="Todo-edit-form">
            <form onSubmit={handleSubmit}>
                <input name="task" type="text" placeholder="edit this todo item" value={input} onChange={handleChange}></input>
                <span className="Todo-buttons">
                    <button type="submit">Submit</button>&nbsp;
                    <button type="button" onClick={cancelEdit}>Cancel</button>
                </span>
            </form>
        </div>
    )

    return (
        <div className="Todo">{task}
            <span className="Todo-buttons">
                <button className="Todo-edit" onClick={showEditForm}>Edit</button>&nbsp;
                <button className="Todo-remove" onClick={handleRemoveClick}>X</button>
            </span>
        </div>
    )
}

export default Todo;