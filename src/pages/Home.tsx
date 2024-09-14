import { Stack } from "@mui/material";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Home = () => {
	return (
		<Stack minHeight={"100vh"} width={"100vw"}>
			<Header />
			<Hero />
		</Stack>
	);
};

export default Home;
