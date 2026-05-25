import { useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../contexts/SessionContext";

type RedirectToSignInIfSignedOutProps = {
  children: ReactNode;
};

const RedirectToSignInIfSignedOut = (
  props: RedirectToSignInIfSignedOutProps,
) => {
  const { token } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  // if signed in, redirect to the home page
  // otherwise, render the children.

  return props.children;
};
export default RedirectToSignInIfSignedOut;
