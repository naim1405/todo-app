import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { PieChart } from "@mui/x-charts";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "400px",
	bgcolor: "background.paper",
	boxShadow: 24,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};
const Profile = () => {
	const username = localStorage.getItem("username");
	const [user, setUser] = useState({ name: "", email: "", phone: "" });
	const [isOpen, setIsOpen] = useState(false);
	const [totalTasks, setTotalTasks] = useState(0);
	const [completedTasks, setCompletedTasks] = useState(0);
	const [incompleteTasks, setInCompleteTasks] = useState(0);

	async function getUser() {
		const r = await fetch(
			// "https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/profile/"+ username

			"http://3.109.211.104:8001/profile/" + username
		);
		const j = await r.json();
		setUser(j);
	}

	useEffect(() => {
		if (!username) navigate("/login");
		getUser();
	}, []);

	useEffect(() => {
		fetch(
			"https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos"
		)
			.then((res) => res.json())
			.then((data) => {
				setTotalTasks(data.length);

				let completed_count = 0;
				data.map((item) => {
					if (item.is_completed == true) {
						completed_count += 1;
					}
				});

				setCompletedTasks(completed_count);
				setInCompleteTasks(data.length - completed_count);
			});
	}, []);

	const updateProfile = async () => {
		const r = await fetch("http://3.109.211.104:8001/profile/" + username, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: user.name,
				email: user.email,
				phone: user.phone,
				profile_picture: "",
			}),
		});

		const j = await r.json();
		toast.success("Profile Updated");
		setIsOpen(false);
	};

	return (
		<div style={{ marginTop: 30 }}>
			<>
				<Typography variant="h4">username: {user.username}</Typography>
				<Typography variant="h4">Name: {user.name}</Typography>
				<Typography variant="h4">Email: {user.email}</Typography>
				<Typography variant="h4">Phone: {user.phone}</Typography>
				<Button
					variant="contained"
					style={{ marginTop: 10 }}
					onClick={() => setIsOpen(true)}
				>
					Edit Profile
				</Button>
				<div style={{ marginTop: 30 }}>
					<Typography variant="h4">
						Total Tasks: {totalTasks}
					</Typography>
					<Typography variant="h4">
						Completed Tasks : {completedTasks}
					</Typography>
					<Typography variant="h4">
						Incomplete Tasks : {incompleteTasks}
					</Typography>
				</div>

				<div style={{ marginTop: 0, marginBottom: 30 }}>
					<center>
						<PieChart
							colors={["green", "red"]} // Use palette
							series={[
								{
									data: [
										{
											id: 0,
											value: completedTasks,
											label: "Complete",
										},
										{
											id: 1,
											value: incompleteTasks,
											label: "Incomplete",
										},
									],
								},
							]}
							width={400}
							height={200}
						/>
					</center>
				</div>

				<Modal open={isOpen} onClose={() => setIsOpen(false)}>
					<div style={style}>
						<div
							style={{
								backgroundColor: "white",
								padding: "20px",
							}}
						>
							<h1>Edit Profile</h1>
							<h3>Name</h3>
							<TextField
								placeholder="Name"
								value={user.name}
								onChange={(e) =>
									setUser({ ...user, name: e.target.value })
								}
							/>

							<h3>Email</h3>
							<TextField
								placeholder="Email"
								value={user.email}
								onChange={(e) =>
									setUser({ ...user, email: e.target.value })
								}
							/>
							<h3>Phone</h3>
							<TextField
								placeholder="Phone"
								value={user.phone}
								onChange={(e) =>
									setUser({ ...user, phone: e.target.value })
								}
							/>
							<br />
							<Button
								onClick={updateProfile}
								fullWidth
								variant="contained"
								size="large"
							>
								Update
							</Button>
						</div>
					</div>
				</Modal>
			</>
		</div>
	);
};

export default Profile;
