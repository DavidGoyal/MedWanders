import {
	Button,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (id: string) => {
		setAnchorEl(null);
		navigate(`/form/${id}`);
	};

	return (
		<Stack
			direction={"row"}
			alignItems={"center"}
			width={"100%"}
			paddingY={"1rem"}
			justifyContent={"space-between"}
			height={"10%"}
			paddingX={{ xs: "1rem", sm: "2rem" }}
		>
			<img
				src="https://medwanderassets.s3.ap-south-1.amazonaws.com/assets/Logo_Final_White.png"
				alt="MedWander"
				height={"100%"}
				width={"170px"}
			/>

			<Stack
				direction={"row"}
				alignItems={"center"}
				spacing={2}
				height={"100%"}
				sx={{ display: { xs: "none", sm: "block" } }}
			>
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

			<IconButton
				sx={{ display: { xs: "block", sm: "none" } }}
				onClick={handleClick}
			>
				<MenuIcon />
			</IconButton>

			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				sx={{ display: { xs: "block", sm: "none" }, padding: 0 }}
			>
				<MenuItem
					onClick={() => handleClose("a")}
					sx={{ width: "100%", margin: 0 }}
				>
					<Typography>Form A</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => handleClose("b")}
					sx={{ width: "100%", margin: 0 }}
				>
					<Typography>Form B</Typography>
				</MenuItem>
			</Menu>
		</Stack>
	);
};

export default Header;
