import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Box, Container, Typography } from "@mui/material";
import { entities, researchTree } from "@iddle-factory/config";
import ResearchTreeVisualizer from "./components/ResearchTreeVisualizer";
import EntitySearch from "./components/EntitySearch";
import Navigation from "./components/Navigation";
import {
	transformResearchTree,
	connectEntitiesToResearchTree,
} from "./utils/dataTransformers";

function App() {
	// Transform the research tree data for visualization
	const treeData = transformResearchTree(researchTree);

	// Connect entities to their respective research nodes
	const connectedTreeData = connectEntitiesToResearchTree(treeData, entities);

	return (
		<BrowserRouter>
			<CssBaseline />
			<Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
				<Container maxWidth="xl" sx={{ py: 4 }}>
					<Typography variant="h3" component="h1" gutterBottom align="center">
						Idle Factory Visualizer
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						align="center"
						sx={{ mb: 4 }}
					>
						A visual exploration of the research tree and entities in Idle
						Factory
					</Typography>

					<Routes>
						<Route path="/" element={<Navigation />}>
							<Route
								index
								element={
									<Box>
										<Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
											Research Tree Visualization
										</Typography>
										<Typography variant="body1" paragraph>
											This tree shows the research progression structure. Green
											nodes contain entities that are unlocked by that research.
											Click on any green node to see the related entities.
										</Typography>
										<ResearchTreeVisualizer treeData={connectedTreeData} />
									</Box>
								}
							/>
							<Route
								path="entities"
								element={<EntitySearch entities={entities.entities} />}
							/>
						</Route>
					</Routes>
				</Container>
			</Box>
		</BrowserRouter>
	);
}

export default App;
