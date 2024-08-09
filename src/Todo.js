import {useState} from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState(
        [
            {
                id: 1,
                task: 'タスク1',
                isCompleted: false
            },
            {
                id: 2,
                task: 'タスク2',
                isCompleted: false
            }
        ]
    )
    const [task, setTask] = useState('');
    
    const onSubmit = (e) => {
        e.preventDefault()
        const newId = todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1
        const newTodo = {id: newId, task, isCompleted: false};
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setTask('');
    };

    const handleToggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo))
        )
    }

    const handleDeleteCompletedTasks = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted))
    }

    return (
        <div>
            <h1>Todoリスト</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <label>
                            <input 
                              type='checkbox' 
                              checked={todo.isCompleted}
                              onChange={() => handleToggleComplete(todo.id)}
                            />
                            <span className={todo.isCompleted ? 'completed' : ''}>{todo.task}</span>
                        </label>
                    </li>
                ))}
            </ul>
            <form onSubmit={onSubmit}>
                <label htmlFor='task'>やること：</label>
                <input
                    type='text'
                    id='task'
                    name='task'
                    value={task}
                    onChange={(e) => {
                        setTask(e.target.value)
                    }}
                />
                <button type='submit'>追加</button>
            </form>
            <button type='button' onClick={handleDeleteCompletedTasks}>完了タスクを削除</button>
        </div>
    );
}
export default TodoList;