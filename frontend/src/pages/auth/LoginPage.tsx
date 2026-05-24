import AuthForm from "./AuthForm";
import FormContainer from "./FormContainer";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState("");
  return (
    <FormContainer>
      {error && (
        <div className="text-red-500 bg-zinc-300 rounded-sm px-4 py-1 border border-red-500">
          {error}
        </div>
      )}
      <AuthForm
        fields={[
          {
            label: "username",
            type: "text",
          },
          {
            label: "password",
            type: "password",
          },
        ]}
        submitButtonLabel="sign in"
        onSubmit={async (values) => {
          console.log(`Login Click: ${values}`);
        }}
      />
      <Link to="/signup" className="text-yellow-300/70 underline text-sm">
        create an account
      </Link>
    </FormContainer>
  );
};

export default LoginPage;
