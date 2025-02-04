import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "./Todo";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { CreateTodoModal } from "./CreateTodoModal";
import { Stack } from "@mui/material";

export function Dashboard() {
	const navigate = useNavigate();
	const username = localStorage.getItem("username");

	const [todolist, setTodoList] = useState([]);
	const [search, setSearch] = useState("");
	const [priority, setPriority] = useState("");
	const [sortBy, setSortBy] = useState("none");

	async function getTodos() {
		const r = await fetch(
			"https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos"
		);
		const j = await r.json();
		setTodoList(j);
		setSortBy("none");
		console.log(j);
	}

	useEffect(() => {
		if (!username) navigate("/login");
		getTodos();
	}, []);

	useEffect(() => {
		let sortedList = [...todolist];

		if (sortBy == "none") {
			sortedList.sort((a, b) => parseInt(a.id) - parseInt(b.id));
			console.log(todolist);
		} else if (sortBy == "priority") {
			sortedList.sort(
				(a, b) => -parseInt(a.priority) + parseInt(b.priority)
			);
			console.log(todolist);
		} else if (sortBy == "deadline") {
			sortedList.sort((a, b) => {
				const d1 = new Date(a.deadline);
				const d2 = new Date(b.deadline);
				return d1.getTime() - d2.getTime();
			});

			console.log(todolist);
		} else if (sortBy == "c_time") {
			sortedList.sort((a, b) => {
				const d1 = new Date(a.created_at);
				const d2 = new Date(b.created_at);
				return d1.getTime() - d2.getTime();
			});

			console.log(todolist);
		}
		setTodoList(sortedList);
	}, [sortBy]);

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

					<div style={{ padding: "10px" }}>
						<TextField
							fullWidth
							placeholder="Priority"
							value={priority}
							onChange={(e) => setPriority(e.target.value)}
						/>
					</div>
					<div style={{ padding: "10px" }}>
						Sort By
						<Button
							variant={
								sortBy == "none" ? "contained" : "outlined"
							}
							sx={{ margin: 1 }}
							onClick={() => setSortBy("none")}
						>
							None
						</Button>
						<Button
							variant={
								sortBy == "priority" ? "contained" : "outlined"
							}
							sx={{ marginRight: 1 }}
							onClick={() => setSortBy("priority")}
						>
							Priority
						</Button>{" "}
						<Button
							variant={
								sortBy == "deadline" ? "contained" : "outlined"
							}
							sx={{ marginRight: 1 }}
							onClick={() => setSortBy("deadline")}
						>
							Deadline
						</Button>{" "}
						<Button
							variant={
								sortBy == "c_time" ? "contained" : "outlined"
							}
							onClick={() => setSortBy("c_time")}
						>
							Created At
						</Button>
					</div>
					<div>
						{todolist.map((value, index) => {
							if (
								value.title
									.toLowerCase()
									.includes(search.toLowerCase()) &&
								(priority == "" || value.priority == priority)
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
