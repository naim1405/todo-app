import { Button, Typography } from "@mui/material";
import { useRef, useState } from "react";

const StopWatch = () => {
	const [watchStarted, setWatchStarted] = useState(false);
	const [watch, setWatch] = useState("00:00:00:00");
	const timerId = useRef(null);
	const refTime = useRef(0);

	const runWatch = () => {
		if (watchStarted) {
			setWatchStarted(false);
			clearInterval(timerId.current);
			refTime.current = 0;
			return;
		}
		setWatchStarted(true);
		refTime.current = Date.now();
		timerId.current = setInterval(() => {
			let time = Date.now() - refTime.current;
			let hour = Math.floor(time / 3600000);
			time = time % 3600000;
			let minute = Math.floor(time / 60000);
			time = time % 60000;
			let second = Math.floor(time / 1000);
			time = time % 1000;
			let miliSecond = Math.floor(time / 10);

			hour = String(hour).padStart(2, "0");
			minute = String(minute).padStart(2, "0");
			second = String(second).padStart(2, "0");
			miliSecond = String(miliSecond).padStart(2, "0");

			setWatch(`${hour}:${minute}:${second}:${miliSecond}`);
		}, 1);
	};
	return (
		<>
			<center>
				<div>
					<Typography variant="h2" sx={{ mt: 5 }}>
						{watch}
					</Typography>
					<Button
						variant="outlined"
						size="large"
						sx={{ mt: 5 }}
						onClick={() => {
							runWatch();
						}}
					>
						{watchStarted ? "Stop" : "Start"}
					</Button>
				</div>
			</center>
		</>
	);
};

export default StopWatch;
