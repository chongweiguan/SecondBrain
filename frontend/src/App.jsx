import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { HomePage, FinancePage, JobPage, AcademicPage, LoginPage, RegistrationPage } from "./pages"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";
import './App.css'

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/register" element={<RegistrationPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/" element={<HomePage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/academics" element={<AcademicPage />} />
          <Route path="/jobs" element={<JobPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
