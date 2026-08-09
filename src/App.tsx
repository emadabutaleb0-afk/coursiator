import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Router as WouterRouter, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import PlacementTest from "./pages/PlacementTest";
import StudentPortal from "./pages/StudentPortal";
import InstructorPortal from "./pages/InstructorPortal";
import AdminDashboard from "./pages/AdminDashboard";
import StudentLearningHub from "./pages/StudentLearningHub";
import StudentProgress from "./pages/StudentProgress";
import StudentProfile from "./pages/StudentProfile";
import StudentAuth from "./pages/StudentAuth";
import TeacherAuth from "./pages/TeacherAuth";
import TeacherDashboard from "./pages/TeacherDashboard";
import VideoAssessment from "./pages/VideoAssessment";
import TeacherReports from "./pages/TeacherReports";
import LiveLectures from "./pages/LiveLectures";
import BookingSystem from "./pages/BookingSystem";
import TeacherLiveClass from "./pages/TeacherLiveClass";
import DataManagement from "./pages/DataManagement";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import AITutorPractice from "./pages/AITutorPractice";
import TeacherProfiles from "./pages/TeacherProfiles";
import Messaging from "./pages/Messaging";
import CouponManagement from "./pages/CouponManagement";
import PlacementTestResults from "./pages/PlacementTestResults";
import Login from "./pages/Login";
import AdminAnalyticsDashboard from "./pages/AdminAnalyticsDashboard";
import ShoppingCart from "./pages/ShoppingCart";
import EnhancedCheckout from "./pages/EnhancedCheckout";
import OrderConfirmation from "./pages/OrderConfirmation";
import CertificatePage from "./pages/CertificatePage";


function Router() {
  const baseUrl = import.meta.env.BASE_URL ? import.meta.env.BASE_URL.replace(/\/$/, "") : "";
  return (
    <WouterRouter base={baseUrl}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/courses"} component={Courses} />
        <Route path={"/placement-test"} component={PlacementTest} />
        <Route path={"/student-portal"} component={StudentPortal} />
        <Route path={"/instructor-portal"} component={InstructorPortal} />
        <Route path={"/admin-dashboard"} component={AdminDashboard} />
        <Route path={"/student-learning-hub"} component={StudentLearningHub} />
        <Route path={"/student-progress"} component={StudentProgress} />
        <Route path={"/student-profile"} component={StudentProfile} />
        <Route path={"/student-auth"} component={StudentAuth} />
        <Route path={"/teacher-auth"} component={TeacherAuth} />
        <Route path={"/teacher-dashboard"} component={TeacherDashboard} />
        <Route path={"/video-assessment"} component={VideoAssessment} />
        <Route path={"/teacher-reports"} component={TeacherReports} />
        <Route path={"/live-lectures"} component={LiveLectures} />
        <Route path={"/booking-system"} component={BookingSystem} />
        <Route path={"/teacher-live-class"} component={TeacherLiveClass} />
        <Route path={"/data-management"} component={DataManagement} />
        <Route path={"/analytics-dashboard"} component={AnalyticsDashboard} />
        <Route path={"/ai-tutor"} component={AITutorPractice} />
        <Route path={"/teacher-profiles"} component={TeacherProfiles} />
        <Route path={"/messaging"} component={Messaging} />
        <Route path={"/coupon-management"} component={CouponManagement} />
        <Route path={"/placement-test-results"} component={PlacementTestResults} />
        <Route path={"/login"} component={Login} />
        <Route path="/dashboard" component={AdminAnalyticsDashboard} />
        <Route path="/shopping-cart" component={ShoppingCart} />
        <Route path="/checkout" component={EnhancedCheckout} />
        <Route path="/order-confirmation" component={OrderConfirmation} />
        <Route path="/certificate/:courseId" component={CertificatePage} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

/**
 * App Component
 * - Wraps all routes with providers
 * - Smooth animations and hover effects
 */

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      // switchable
      >
        <AuthProvider>
          <CartProvider>
            <LanguageProvider>
              <TooltipProvider>
                <Toaster />
                <Router />
              </TooltipProvider>
            </LanguageProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
