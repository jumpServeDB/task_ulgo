import { useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as userServices from "../services/user";

type RedirectHomeIfSignedInProps = {
  children: ReactNode;
};

const RedirectHomeIfSignedIn = (props: RedirectHomeIfSignedInProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = userServices.getSessionTokenStorage();
    console.log(token);
    if (token === null) {
      navigate("/login");
    }
  });

  // if signed in, redirect to the home page (MugListPage)
  // otherwise, render the children.

  return props.children;
};
export default RedirectHomeIfSignedIn;
