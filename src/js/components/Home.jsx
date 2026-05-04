import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import Title from "./Title"
import { useEffect, useState } from "react"
import TodoFooter from "./TodoFooter"

    const user = "Gianna";
	const API_URL = "https://playground.4geeks.com/todo";

	const initialTodos = []  

const Home = () => { 
	const [TodosFromAPI, setTodosFromAPI] = useState(initialTodos);
	const [Loading, setLoading] = useState(true) 

	   const handleAddTodo = async (todoText) => {
		const newTodo = {label: todoText, is_done: false}
		
		const url = `${API_URL}/todos/${user}`;
		const options = {
		  method: "POST",
		  body: JSON.stringify(newTodo),
		  headers: {"Content-Type" : "application/json"}
		}

		setLoading(true)

		const response = await fetch(url, options)
		const data = await response.json()

		setLoading(false)

		console.log("handleAddTodo data >>>", data)

		await fetchTodos()
	}

	const handleRemove = async (todo_id) => {
       const url = `${API_URL}/todos/${todo_id}`;
		const options = {
		method: "DELETE",

		}  
		setLoading(true)

		await fetch(url, options)
		setLoading(false)
		await fetchTodos()
	}

	const _fetchTodos = async () => {
		try {
			const response = await fetch (`${API_URL}/user/${user}`);
			const data = await response.json();

			setTodosFromAPI(data.todos)
		}
		catch(error) {
			setError(error.message)
		}

		finally {
			setLoading(false)
		}
	}

	const fetchTodos = async () => {
		setLoading(true)
		const response = await fetch(`${API_URL}/users/${user}`);
		const data = await response.json();

		console.log("data.todos >>>", data.todos)

		setTodosFromAPI(data.todos);

		setLoading(false)
	}

	const handleEditTodoStatus = async (todo_id, updated_is_done) => {
		const updatedTodo = { is_done: updated_is_done}

		const url = `${API_URL}/todos/${todo_id}`
		const options = {
			method: "PUT",
			body: JSON.stringify(updatedTodo),
			headers: {"Content-Type" : "application/json"}
		}

		setLoading(true)

		await fetch(url, options)
		setLoading(false)
		await fetchTodos()
	}

	const verifyUser = async () => {
		const response = await fetch(`${API_URL}/users/${user}`);

		if(response.status === 404) {
			await fetch(`${API_URL}/users/${user}`, {
				method: "POST",
			});
		}
		await fetchTodos()
	}

	useEffect(() => {
       verifyUser();
	}, [])


	return (
		<div className="d-flex justify-content-center align-items-center bg-light min-vh-100">
			<div className="todo-wrapper"> 
				<Title />
				<div className="todo-card">
					<TodoInput onAddTodo = {handleAddTodo} /> 
					{Loading
					  ? 
						<div class="d-flex justify-content-center p-4">
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					</div> 
					: <TodoList todos = {TodosFromAPI} onRemoveTodo = {handleRemove} onEditTodoStatus = {handleEditTodoStatus} />
                    }
					<TodoFooter todosCount = {TodosFromAPI.length} />
				</div>
			</div>
		</div> 
	)
}

export default Home;