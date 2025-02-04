import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "./Todo";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { CreateTodoModal } from "./CreateTodoModal";

export function Dashboard() {
	const navigate = useNavigate();
	const username = localStorage.getItem("username");

	const [todolist, setTodoList] = useState([]);
	const [search, setSearch] = useState("");

	async function getTodos() {
		const r = await fetch(
			"https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos"
		);
		const j = await r.json();
		setTodoList(j);
		console.log(j);
	}

	useEffect(() => {
		if (!username) navigate("/login");
		getTodos();
	}, []);

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
				}}
			>
				<div style={{ width: "500px" }}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<h1>Welcome, {username}!</h1>
					</div>
					<div style={{ padding: "10px" }}>
						<TextField
							fullWidth
							placeholder="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<div>
						{todolist.map((value, index) => {
							if (
								value.title
									.toLowerCase()
									.includes(search.toLowerCase())
							)
								return (
									<Todo
										key={value.id}
										title={value.title}
										priority={value.priority}
										is_completed={value.is_completed}
										id={value.id}
										updateTodos={getTodos}
										deadline={value.deadline}
										description={value.description}
									/>
								);
							return <></>;
						})}
					</div>
					<br />
					<br />
					<CreateTodoModal updateTodos={getTodos} />
				</div>
			</div>
		</>
	);
}
