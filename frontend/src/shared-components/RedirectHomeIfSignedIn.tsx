import { useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../contexts/SessionContext";

type RedirectHomeIfSignedInProps = {
  children: ReactNode;
};

const RedirectHomeIfSignedIn = (props: RedirectHomeIfSignedInProps) => {
  const { token } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  // if signed in, redirect to the home page (MugListPage)
  // otherwise, render the children.

  return props.children;
};
export default RedirectHomeIfSignedIn;
