/* eslint-disable react/display-name */
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MUIThemeProvider from "./components/MUI-theme/MUIThemeProvider";
import { useState } from "react";
import TextAreaInput from "./components/input-textarea";

function App() {
  const queryClient = new QueryClient();

  return (
    <MUIThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TextAreaInput />
      </QueryClientProvider>
    </MUIThemeProvider>
  );
}

export default App;
