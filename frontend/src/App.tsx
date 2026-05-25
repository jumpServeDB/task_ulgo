import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import * as userServices from "./services/user";
import { useState } from "react";
import type { Session } from "./contexts/SessionContext";
import SessionContext from "./contexts/SessionContext";

function App() {
  const [sessionToken, setSessionToken] = useState<string | null>(() =>
    userServices.getSessionTokenStorage(),
  );
  const contextValue: Session = {
    token: sessionToken,
    logIn: (token: string) => {
      setSessionToken(token);
      userServices.setSessionTokenStorage(token);
    },
    logOut: () => {
      setSessionToken(null);
      userServices.removeSessionTokenStorage();
    },
  };
  return (
    <SessionContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </SessionContext.Provider>
  );
}

export default App;
