import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import Explore from "./pages/Explore";

function App() {
	return (
		<div>
  
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/businesses" element={<Explore />} />
				<Route path="/favorites" element={<Favorites />} />
        		<Route path="/login" element={<LoginForm />} />

			</Routes>
		</div>
	);
}

export default App;
