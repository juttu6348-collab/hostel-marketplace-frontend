import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import SearchResultsPage from "../pages/public/SearchResultsPage";
import HostelDetailsPage from "../pages/public/HostelDetailsPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AccountPage from "../pages/account/AccountPage";
import FavouritesPage from "../pages/account/FavouritesPage";
import BookingRequestPage from "../pages/booking/BookingRequestPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Header from "../components/layout/Header";
import ROUTES from "../constants/routes";
import OwnerDashboardPage from "../pages/owner/OwnerDashboardPage";
import OwnerRoute from "../components/auth/OwnerRoute";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminRoute from "../components/auth/AdminRoute";
import AboutPage from "../pages/public/AboutPage";
import ContactPage from "../pages/public/ContactPage";
import HowItWorksPage from "../pages/public/HowItWorksPage";
import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage";
import SafetyGuidelinesPage from "../pages/public/SafetyGuidelinesPage";
import TermsAndConditionsPage from "../pages/public/TermsAndConditionsPage";
import NotFoundPage from "../pages/public/NotFoundPage";
function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />

      <Route
        path={ROUTES.HOSTELS}
        element={<SearchResultsPage />}
      />

      <Route
        path={ROUTES.HOSTEL_DETAILS}
        element={<HostelDetailsPage />}
      />

      <Route
        path={ROUTES.LOGIN}
        element={<LoginPage />}
      />

      <Route
        path={ROUTES.REGISTER}
        element={<RegisterPage />}
      />

      <Route
        path={ROUTES.ACCOUNT}
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.FAVOURITES}
        element={<FavouritesPage />}
      />

      <Route
        path={ROUTES.BOOKING_REQUEST}
        element={
          <ProtectedRoute>
            <BookingRequestPage />
          </ProtectedRoute>
        }
      />

      <Route
  path="/about"
  element={<AboutPage />}
/>

<Route
  path="/how-it-works"
  element={<HowItWorksPage />}
/>

<Route
  path="/safety-guidelines"
  element={<SafetyGuidelinesPage />}
/>

<Route
  path="/privacy-policy"
  element={<PrivacyPolicyPage />}
/>

<Route
  path="/terms-and-conditions"
  element={<TermsAndConditionsPage />}
/>

<Route
  path="/contact"
  element={<ContactPage />}
/>

      <Route
  path={ROUTES.OWNER_DASHBOARD}
  element={
    <OwnerRoute>
      <OwnerDashboardPage />
    </OwnerRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_DASHBOARD}
  element={
    <AdminRoute>
      <AdminDashboardPage />
    </AdminRoute>
  }

/>

      <Route
        path="*"
        element={
          <>
            <Header />

            <main className="section">
              <div className="container">
                <div className="card page-not-found-card">
                  <h1>Page not found</h1>

                  <p>
                    The page you requested does not exist.
                  </p>
                </div>
              </div>
            </main>
          </>
        }
      />
    </Routes>
  );
}

export default AppRoutes;