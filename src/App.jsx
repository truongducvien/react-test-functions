/* eslint-disable react/display-name */
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MUIThemeProvider from "./components/MUI-theme/MUIThemeProvider";
import DrawingCanvas from "./components/drawing-canvas";

function App() {
  const queryClient = new QueryClient();

  return (
    <MUIThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DrawingCanvas />
      </QueryClientProvider>
    </MUIThemeProvider>
  );
}

export default App;
