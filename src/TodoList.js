import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    function removeItem(uuid) {
        const newList = [...todos];
        let i = 0;
        while (newList[i].id !== uuid && i < newList.length) i++;
        if (i !== newList.length) newList.splice(i, 1);
        setTodos(newList);
    }

    function addItem(task) {
        const newItem = { id: uuid(), task: task, complete: false}
        const newList = [...todos, newItem];
        setTodos(newList);
    }

    function editItem(uuid, newTask) {
        const newList = [...todos];
        let i = 0;
        while (newList[i].id !== uuid && i < newList.length) i++;
        if (i !== newList.length) newList[i].task = newTask;
        setTodos(newList);
    }

    return (
        <div className="TodoList">
            <h1>Todo:</h1>
            {todos.map(todo => <Todo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                complete={todo.complete}
                handleRemove={(id) => removeItem(id)}
                handleEdit={(id, task) => editItem(id, task)}
            />)}
            <NewTodoForm addItem={addItem} />
        </div>
    )
}

export default TodoList;