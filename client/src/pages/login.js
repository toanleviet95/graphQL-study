import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

import { LoginForm, Loading } from "../components";
import { LOGIN_USER } from "../gqls/login";

export default function Login() {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login);
      client.writeData({ data: { isLoggedIn: true } });
    }
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
