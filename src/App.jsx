import { Login } from "./components/Login";
import "./App.css";
import { Create } from "./components/Create";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import StopWatch from "./components/StopWatch";
function App() {
	return (
		<>
			<Router>
				<NavBar></NavBar>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Create />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/stopwatch" element={<StopWatch />} />
				</Routes>
			</Router>
			<Toaster />
		</>
	);
}

export default App;
