import AppRoutes from "./routes/AppRoutes";
import SkipLink from "./components/common/SkipLink";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ToastContainer from "./components/common/ToastContainer";

function App() {
  return (
    <div className="app-layout">
      <SkipLink />
      <ScrollToTop />
      <main
  id="main-content"
  className="app-main-content"
  tabIndex="-1"
>
  <AppRoutes />
</main>

      <Footer />

      <ToastContainer />
    </div>
  );
}

export default App;