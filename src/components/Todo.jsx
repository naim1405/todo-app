import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import toast from "react-hot-toast";

export function Todo({ title, is_completed, priority, id, updateTodos }) {
	async function deleteClick() {
		const r = await fetch(
			"https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/" +
				id,
			{
				method: "DELETE",
			}
		);
		const j = await r.json();
		toast.success(j.message);
		updateTodos();
	}
	const markDone = async () => {
		const r = await fetch(
			"https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/" +
				id,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: `${title}`,
					description: "string",
					deadline: "2025-02-04T09:29:55.529Z",
					priority: priority,
					is_completed: true,
				}),
			}
		);

		const j = await r.json();
		toast.success(j.message);
		updateTodos();
	};
	return (
		<div
			style={{
				padding: "20px",
				margin: "10px",
				border: "1px solid black",
				borderRadius: "10px",
				backgroundColor:
					priority > 8 ? "rgba(255,0,0,0.3)" : "rgba(0,255,0,0.3)",
			}}
		>
			<div
				style={{
					fontSize: "30px",
					textDecoration: is_completed ? "line-through" : "",
				}}
			>
				{is_completed ? "✅" : "⌛"}
				{title}
			</div>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
				}}
			>
				<div
					onClick={markDone}
					style={{ fontSize: "35px", cursor: "pointer" }}
				>
					✅
				</div>
				<div
					onClick={deleteClick}
					style={{ fontSize: "30px", cursor: "pointer" }}
				>
					❌
				</div>
			</div>
		</div>
	);
}
