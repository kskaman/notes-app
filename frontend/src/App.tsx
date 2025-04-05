import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Redirect the root / to /auth/signin */}

        <Route path="/" element={<Navigate to="/auth/signin" replace />} />

        {/* All /auth/... routes go to AuthPage */}
        <Route path="/auth/*" element={<AuthPage />} />

        {/* Fallback if the user visits something else */}
        <Route path="*" element={<Navigate to="/auth/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
