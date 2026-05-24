import RedirectToSignInIfSignedOut from "../../shared-components/RedirectToSignInIfSignedOut";
import * as userServices from "../../services/user";

export default function HomePage() {
  return (
    <RedirectToSignInIfSignedOut>
      <h1>I am home page</h1>
      <button onClick={userServices.removeSessionTokenStorage}>Logout</button>
    </RedirectToSignInIfSignedOut>
  );
}
