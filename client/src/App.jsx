import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Component/AppBar/NavBar";
import { Store } from "./Context/ContextStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CopyRight from "./Component/CopyRight/CopyRight";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./Component/ScrollToTop";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_Client_ID}>
      <Store>
        <BrowserRouter>
          <NavBar />
          <ToastContainer position="top-right" theme="light" />
          <ScrollToTop />
          <AppRoutes />
          <CopyRight />
        </BrowserRouter>
      </Store>
    </GoogleOAuthProvider>
  );
};

export default App;
