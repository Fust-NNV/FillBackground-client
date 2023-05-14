import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SegmentPage from "./components/pages/segment";
import Button from "./components/pages/test-coord";


function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SegmentPage />} />
					<Route path="/test-coord" element={<Button />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
