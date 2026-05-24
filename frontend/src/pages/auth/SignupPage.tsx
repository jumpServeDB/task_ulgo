import { Link, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import FormContainer from "./FormContainer";
import { useState } from "react";
import * as userServices from "../../services/user.ts";

export const SignupPage = () => {
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
            label: "email",
            type: "email",
          },
          {
            label: "password",
            type: "password",
          },
          {
            label: "confirm password",
            type: "password",
          },
        ]}
        submitButtonLabel="sign up"
        onSubmit={async (values) => {
          console.log(`signup clicked`);
          if (values.username.length < 4) {
            setError("username is too short");
            return;
          }
          if (values.password.length < 4) {
            setError("password is too short");
            return;
          }
          if (values["confirm password"] !== values.password) {
            setError("passwords do not match");
            return;
          }
          setError("");
          const response = await userServices.createUser({
            email: values.email,
            password: values.password,
          });

          if (response.status === 201) {
            console.log("user created!");
          } else {
            console.log(response);
          }
        }}
      />
      <Link to="/login" className=" text-yellow-300/70 underline text-sm">
        log in
      </Link>
    </FormContainer>
  );
};
