import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import toast from "react-hot-toast";
import { useRef, useState, useEffect } from "react";

const formatTime = (msTime) => {
	if (msTime < 0) {
		return `0d 0h 0m 0s`;
	}
	const days = Math.floor(msTime / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(msTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((msTime % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((msTime % (1000 * 60)) / 1000);
	return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export function Todo({
	title,
	is_completed,
	priority,
	id,
	updateTodos,
	deadline,
	description,
}) {
	const deadlineN = new Date(deadline);
	const [remainingTime, setRemainingTime] = useState(
		formatTime(deadlineN.getTime() - Date.now())
	);
	const [isCountdownActive, setIsCountdownActive] = useState(true);
	const deadlineCountDown = useRef(null);

	useEffect(() => {
		if (is_completed || !isCountdownActive) return;

		deadlineCountDown.current = setInterval(() => {
			const remaining = deadlineN.getTime() - Date.now();
			setRemainingTime(formatTime(remaining));
			if (remaining <= 0) {
				clearInterval(deadlineCountDown.current);
				setIsCountdownActive(false);
			}
		}, 1000);

		return () => clearInterval(deadlineCountDown.current);
	}, [is_completed, isCountdownActive]);

	async function deleteClick() {
		clearInterval(deadlineCountDown.current);
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
		setIsCountdownActive(false);
		setRemainingTime(formatTime(0));
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
			{/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
			<div>
				<div
					style={{
						fontSize: "30px",
						textDecoration: is_completed ? "line-through" : "",
					}}
				>
					{is_completed ? "✅" : "⌛"}
					{title}
				</div>
				<div style={{ paddingLeft: 10 }}>
					<div>{description}</div>
					<div>Remaining time: {remainingTime}</div>
				</div>
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
