import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/avatar.png";

const Hero = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const navigate = useNavigate();

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Stack
			minHeight={"90vh"}
			width={"100%"}
			paddingX={{ xs: "1rem", sm: "3rem" }}
			paddingY={"1rem"}
			direction={{ xs: "column", md: "row" }}
			gap={{ xs: "6rem", md: "0" }}
		>
			<Stack
				width={{ xs: "100%", md: "60%" }}
				borderRight={{ xs: "none", md: "2px solid gray" }}
				gap={"4rem"}
			>
				<Typography
					variant="h1"
					textAlign={"center"}
					width={{ xs: "90%", sm: "70%", md: "90%", lg: "70%" }}
					mx={"auto"}
				>
					Store your {windowWidth > 550 ? "information " : "info "} safely here.
				</Typography>

				<Typography
					variant="h6"
					textAlign={"center"}
					width={{ xs: "80%", sm: "75%" }}
					mx={"auto"}
				>
					Remove your stress of storing information securely on your device.
					Store your information in a secure cloud storage.
				</Typography>

				<Stack direction={"row"} alignItems={"center"} spacing={2} mx={"auto"}>
					<Button
						variant={"contained"}
						sx={{ bgcolor: "white" }}
						onClick={() => navigate("/form/a")}
					>
						Form A
					</Button>
					<Button
						variant="contained"
						sx={{ bgcolor: "white" }}
						onClick={() => navigate("/form/b")}
					>
						Form B
					</Button>
				</Stack>
			</Stack>

			<Stack
				width={{ xs: "100%", md: "40%" }}
				justifyContent={"flex-end"}
				alignItems={"center"}
				gap={"8rem"}
			>
				<Stack gap={"4rem"}>
					<Stack>
						<Typography variant="h2" textAlign={"center"}>
							10 GB
						</Typography>
						<Typography variant="h6" textAlign={"center"}>
							Data stored to date
						</Typography>
					</Stack>

					<Stack>
						<Typography variant="h2" textAlign={"center"}>
							100
						</Typography>
						<Typography variant="h6" textAlign={"center"}>
							Users to date
						</Typography>
					</Stack>
				</Stack>

				<Stack alignItems={"center"}>
					<Avatar src={img} />
					<Typography variant="h6" textAlign={"center"}>
						A truly game changing storage
					</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Hero;
