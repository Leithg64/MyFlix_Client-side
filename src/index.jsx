import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const MyFlixApplication = () => {
  return <MainView />;
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);