import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Input,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const countryCodes = [
	{ code: "+1", name: "United States" },
	{ code: "+44", name: "United Kingdom" },
	{ code: "+91", name: "India" },
];

const formSchema = z
	.object({
		name: z
			.string()
			.min(1, "Name is required")
			.regex(/^[A-Za-z ]+$/, "Name should only contain alphabetic characters"),
		country_code: z
			.string({ required_error: "Country code is required" })
			.refine((val) => countryCodes.map((c) => c.code).includes(val), {
				message: "Invalid country code",
			}),
		phone: z
			.string()
			.min(1, "Phone number is required")
			.regex(/^\d+$/, "Phone number should contain only numbers"),
	})
	.superRefine((obj, ctx) => {
		const countryCode = obj.country_code;
		if (
			(countryCode === "+1" && obj.phone.length !== 10) ||
			(countryCode === "+44" && obj.phone.length !== 11) ||
			(countryCode === "+91" && obj.phone.length !== 10)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Invalid phone format of selected country",
				path: ["phone"],
			});
		}
	});

type FormData = z.infer<typeof formSchema>;

const Form = ({ formId }: { formId: string }) => {
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: localStorage.getItem("name") ? localStorage.getItem("name")! : "",
			country_code: localStorage.getItem("country_code")
				? localStorage.getItem("country_code")!
				: "",
			phone: localStorage.getItem("phone")
				? localStorage.getItem("phone")!
				: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		const id = toast.loading("Submitting Info...");
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/new`,
				{ form: formId, ...data },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data.success) {
				localStorage.setItem("name", data.name);
				localStorage.setItem("country_code", data.country_code);
				localStorage.setItem("phone", data.phone);

				toast.success(response.data.message, { id });
			}
		} catch (error) {
			const err = error as AxiosError<{ success: boolean; message: string }>;
			toast.error(err?.response?.data?.message as string, { id });
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{ width: "100%", height: "80%" }}
		>
			<Stack gap={"0.5rem"}>
				<Stack>
					<label htmlFor="name">Name</label>
					<Input
						{...register("name")}
						id="name"
						disableUnderline
						placeholder="David Goyal"
						sx={{
							bgcolor: "rgba(55, 65, 81, .5)",
							borderRadius: "10px",
							height: "2.5rem",
							padding: "0.5rem",
						}}
					/>
					{errors.name && (
						<Typography variant="caption" color="error">
							{errors.name.message}
						</Typography>
					)}
				</Stack>

				<Stack>
					<label htmlFor="country_code">Country Code</label>
					<Select
						{...register("country_code")}
						id="country_code"
						sx={{
							bgcolor: "rgba(55, 65, 81, .5)",
							borderRadius: "10px",
							height: "2.5rem",
						}}
					>
						{countryCodes.map((code, index) => (
							<MenuItem key={index} value={code.code}>
								{code.name} ({code.code})
							</MenuItem>
						))}
					</Select>
					{errors.country_code && (
						<Typography variant="caption" color="error">
							{errors.country_code.message}
						</Typography>
					)}
				</Stack>

				<Stack>
					<label htmlFor="phone">Phone Number</label>
					<Input
						{...register("phone")}
						id="phone"
						disableUnderline
						sx={{
							bgcolor: "rgba(55, 65, 81, .5)",
							borderRadius: "10px",
							height: "2.5rem",
							padding: "0.5rem",
						}}
						placeholder="9876543210"
						type="phone"
					/>
					{errors.phone && (
						<Typography variant="caption" color="error">
							{errors.phone.message}
						</Typography>
					)}
				</Stack>

				<Button
					type="submit"
					variant="contained"
					sx={{ mt: "1rem" }}
					disabled={loading}
				>
					Submit
				</Button>
			</Stack>
		</form>
	);
};

export default Form;
