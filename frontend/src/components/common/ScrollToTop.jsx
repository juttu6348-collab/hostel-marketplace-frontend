import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    const mainContent =
      document.getElementById("main-content");

    mainContent?.focus({
      preventScroll: true,
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;