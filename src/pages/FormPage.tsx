import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SyncIcon from "@mui/icons-material/Sync";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";

const FormPage = () => {
	const params = useParams();
	const [updating, setUpdating] = useState(false);
	const navigate = useNavigate();

	if (params.id !== "a" && params.id !== "b") {
		return <Navigate to="/" />;
	}

	const onRefresh = async () => {
		setUpdating(true);
		const id = toast.loading("Updating data...");
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update`
			);

			if (response.data.success) {
				toast.success(response.data.message, { id });
			}
		} catch (error) {
			const err = error as AxiosError<{ success: boolean; message: string }>;
			toast.error(err?.response?.data?.message as string, { id });
		} finally {
			setUpdating(false);
		}
	};

	return (
		<Stack
			minHeight={"100vh"}
			width={"100vw"}
			alignItems={"center"}
			justifyContent={"center"}
			padding={"1rem"}
			gap={"1rem"}
			position={"relative"}
		>
			<IconButton
				sx={{ position: "absolute", top: "1rem", right: "1rem" }}
				onClick={onRefresh}
				disabled={updating}
			>
				<SyncIcon />
			</IconButton>

			<Stack minWidth={"20vw"} minHeight={"58vh"} gap={"1rem"}>
				<Button
					variant="contained"
					onClick={() => navigate(-1)}
					sx={{ width: "fit-content" }}
				>
					<KeyboardBackspaceIcon />
				</Button>

				<Stack
					minWidth={"20vw"}
					minHeight={"58vh"}
					bgcolor={"hsla(210,20%,98%,0.05)"}
					padding={"2rem"}
					borderRadius={"1rem"}
					justifyContent={"space-between"}
				>
					<Typography variant="h3" textAlign={"center"}>
						Welcome to Form {params.id?.toUpperCase()}
					</Typography>

					<Form formId={params.id!} />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default FormPage;
