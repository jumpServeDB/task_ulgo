import AuthForm from "./AuthForm";
import FormContainer from "./FormContainer";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import * as userServices from "../../services/user.ts";
import RedirectHomeIfSignedIn from "../../shared-components/RedirectHomeIfSignedIn.tsx";
import SessionContext from "../../contexts/SessionContext.ts";

type LoginLocationState = { accountCreated?: boolean };

const LoginPage = () => {
  const [error, setError] = useState("");
  const location = useLocation() as { state?: LoginLocationState };
  const sessionContext = useContext(SessionContext);

  return (
    <RedirectHomeIfSignedIn>
      <FormContainer>
        {location.state?.accountCreated && (
          <div className="text-emerald-400">
            Account Created. Please sign in.
          </div>
        )}
        {error && (
          <div className="text-red-500 bg-zinc-300 rounded-sm px-4 py-1 border border-red-500">
            {error}
          </div>
        )}
        <AuthForm
          fields={[
            {
              label: "email",
              type: "email",
            },
            {
              label: "password",
              type: "password",
            },
          ]}
          submitButtonLabel="sign in"
          onSubmit={async (values) => {
            const response = await userServices.createSession({
              email: values.email,
              password: values.password,
            });
            const data = await response.json();

            if (response.status === 200) {
              setError("");
              sessionContext.logIn(data.token);
            } else {
              setError(data.error);
            }
          }}
        />
        <Link to="/signup" className="text-yellow-300/70 underline text-sm">
          create an account
        </Link>
      </FormContainer>
    </RedirectHomeIfSignedIn>
  );
};

export default LoginPage;
