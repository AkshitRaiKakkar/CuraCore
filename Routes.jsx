import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PatientRegistration from './pages/patient-registration';
import AppointmentBooking from './pages/appointment-booking';
import PatientDashboard from './pages/patient-dashboard';
import LoginPage from './pages/login';
import PatientProfile from './pages/patient-profile';
import TherapistDashboard from './pages/therapist-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AppointmentBooking />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
