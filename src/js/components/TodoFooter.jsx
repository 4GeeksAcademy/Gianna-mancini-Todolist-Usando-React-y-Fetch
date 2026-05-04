const TodoFooter = (props) => {
    return (
        <div className="todo-footer border-top">
            {props.todosCount} item left
        </div>
    )
}

export default TodoFooter;