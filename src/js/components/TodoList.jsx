const TodoList = (props) => {
    return (
        <ul className="list-group list-group-flush">
            { props.todos.length === 0 ? "No hay tareas, añadir tareas" : ""}
            {props.todos.map(todo => (                          
                <li className="list-group-item d-flex justify-content-between align-items-center todo-item">
                    <span>{todo.label}</span>
                    <div className="check-icon">
                    <span className="todo-action text-danger" onClick={() => props.onEditTodoStatus(todo.id, !todo.is_done)}>
                        {todo.is_done ? "✅" : "❌"}
                    </span>  
                    <span className="todo-action text-danger" onClick={() => props.onRemoveTodo(todo.id)}>🗑️</span>
                    </div>
                </li>
            ))}
        </ul> 
    )
} 

export default TodoList;