import { Routes, Route, Navigate } from "react-router";
import AuthPage from "./AuthPage";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import Login from "./components/Login";
import Signup from "./components/Signup";

export function AuthRoutes() {
  return (
    <Routes>
      {/* 
        This Route now matches exactly "/auth/*" 
        because AuthRoutes is mounted at "auth/*" in App.tsx
      */}
      <Route path="" element={<AuthPage />}>
        {/* /auth        → /auth/login */}
        <Route index element={<Navigate to="login" replace />} />

        {/* /auth/login */}
        <Route path="login" element={<Login />} />

        {/* /auth/signup */}
        <Route path="signup" element={<Signup />} />

        {/* /auth/reset-password */}
        <Route path="reset-password" element={<ResetPassword />} />

        {/* /auth/verify-email */}
        <Route path="verify-email" element={<VerifyEmail />} />
      </Route>
    </Routes>
  );
}
