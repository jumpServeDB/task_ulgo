import React from "react";

export type Session = {
  token: string | null;
  logIn: (token: string) => void;
  logOut: () => void;
};

const defaultSession: Session = {
  token: null,
  logIn: () => {},
  logOut: () => {},
};

const SessionContext = React.createContext<Session>(defaultSession);
export default SessionContext;
