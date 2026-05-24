import RedirectToSignInIfSignedOut from "../../shared-components/RedirectToSignInIfSignedOut";
import SessionContext from "../../contexts/SessionContext";
import { useContext } from "react";

export default function HomePage() {
  const sessionContext = useContext(SessionContext);
  return (
    <RedirectToSignInIfSignedOut>
      <h1>I am home page</h1>
      <button onClick={() => sessionContext.logOut()}>Logout</button>
    </RedirectToSignInIfSignedOut>
  );
}
