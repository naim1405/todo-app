import { Toolbar, AppBar, Button, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function logoutClick() {
	localStorage.removeItem("username");
	toast.success("Logged out successfully");
	navigate("/login");
}

const NavBar = () => {
	const navigate = useNavigate();
	const username = localStorage.getItem("username");
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography sx={{ flexGrow: 1 }}>TODO</Typography>
					<Stack direction="row" spacing={2}>
						<Button
							variant="h6"
							color="inherit"
							onClick={() => navigate("/")}
						>
							Home
						</Button>

						<Button
							variant="h6"
							color="inherit"
							onClick={() => navigate("/stopwatch")}
						>
							Stopwatch
						</Button>

						{!username && (
							<Button
								variant="h6"
								color="inherit"
								onClick={() => navigate("/login")}
							>
								Login
							</Button>
						)}

						{!username && (
							<Button
								variant="h6"
								color="inherit"
								onClick={() => navigate("/signup")}
							>
								Sign Up
							</Button>
						)}
						{username && (
							<Button
								variant="h6"
								color="inherit"
								onClick={() => navigate("/dashboard")}
							>
								Dashboard
							</Button>
						)}
						{username && (
							<Button
								variant="h6"
								color="inherit"
								onClick={() => logoutClick()}
							>
								Log Out
							</Button>
						)}
					</Stack>
				</Toolbar>
			</AppBar>
		</>
	);

	("hi there");
};
export default NavBar;
