import React, {useState, useEffect} from 'react';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, input]);
            setInput('');
        }
    };

    const removeTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    }

    return (
        <div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='ADD A NEW tASK'
            />
            <button onClick={addTodo}>ADD</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => removeTodo(index)}>DELETE</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TodoApp;