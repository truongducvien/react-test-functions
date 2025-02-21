/* eslint-disable react/display-name */
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MUIThemeProvider from "./components/MUI-theme/MUIThemeProvider";
import { Loading } from "./components/framer-motion";

function App() {
  const queryClient = new QueryClient();

  return (
    <MUIThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Loading />
      </QueryClientProvider>
    </MUIThemeProvider>
  );
}

export default App;
