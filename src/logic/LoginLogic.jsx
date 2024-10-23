import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
      user {
        id
        username
      }
    }
  }
`;
function LoginLogic() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem("token", data?.login?.token);
      localStorage.setItem("user", JSON.stringify(data?.login?.user?.username));
      localStorage.setItem("userId", JSON.stringify(data?.login?.user?.id));

      navigate("/users");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        username: formData.username,
        password: formData.password,
      },
    });
  };

  return [handleSubmit, loading, error, formData, handleChange];
}

export default LoginLogic;
