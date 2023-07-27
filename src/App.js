/* eslint-disable react/display-name */

import { Routes, Route, } from "react-router-dom";

import React from 'react';
import DashBoard from "./pages/dashboard";
import SignUp from "./pages/SIgnUp";
import Diseases from "./pages/diseases";
import SignIn from "./pages/SignIn";
import ForgotPass from "./pages/ForgotPass";
import Flights from "./pages/Flights";
import Roles from "./pages/Roles";
import AdminPage from "./pages/AdminPage";
import Borders from "./component/Borders";
import Disease from "./component/Disease";
import AddDisease from "./component/AddDisease";
import withProtectedRoute from './pages/withProtectedRoute';
import withNoAuth from './pages/withNoAuth';
import { AuthProvider } from './AuthContext';
import WithProtectedIfAdmin from "./pages/WithProtectedIfAdmin";

export default function App() {
  const NoAuthSignIn = withNoAuth(SignIn);
  const NoAuthSignUp = withNoAuth(SignUp);

  const ProtectedFlights = withProtectedRoute(Flights);
  const ProtectedDiseases = withProtectedRoute(Diseases);
  const ProtectedRoles = withProtectedRoute(Roles);
  const ProtectedDisease = withProtectedRoute(Disease);
  const ProtectedAdminPage = WithProtectedIfAdmin(AdminPage);
  const ProtectedBorders = withProtectedRoute(Borders);
  const ProtectedAddDisease = withProtectedRoute(AddDisease);

  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="DashBoard" element={<DashBoard />} />
          <Route path="Flights" element={<ProtectedFlights />} />
          <Route path="Diseases" element={<ProtectedDiseases />} />
          <Route path="Signin" element={<NoAuthSignIn />} />
          <Route path="ForgotPass" element={<ForgotPass />} />
          <Route path="Roles" element={<ProtectedRoles />} />
          <Route path="Disease" element={<ProtectedDisease />} />
          <Route path="AdminPage" element={<ProtectedAdminPage />} />
          <Route path="Borders" element={<ProtectedBorders />} />
          <Route path="AddDisease" element={<ProtectedAddDisease />} />
          <Route path="SignUp" element={<NoAuthSignUp />} />
        </Routes>
    </AuthProvider>

  );
}
