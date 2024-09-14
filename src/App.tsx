import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const FormPage = lazy(() => import("./pages/FormPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
	return (
		<Router>
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/form/:id" element={<FormPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Toaster position="bottom-center" />
			</Suspense>
		</Router>
	);
};

export default App;
