import { useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as userServices from "../services/user";

type RedirectToSignInIfSignedOutProps = {
  children: ReactNode;
};

const RedirectToSignInIfSignedOut = (
  props: RedirectToSignInIfSignedOutProps,
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = userServices.getSessionTokenStorage();
    console.log(token);
    if (token === null) {
      navigate("/login");
    }
  });

  // if signed in, redirect to the home page
  // otherwise, render the children.

  return props.children;
};
export default RedirectToSignInIfSignedOut;
