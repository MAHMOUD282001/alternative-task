import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_USERS = gql`
  query GetUsers {
    listUsers(input: { active: true }) {
      paginatorInfo {
        total
      }
      data {
        id
        username
      }
    }
  }
`;
function UsersLogic() {
  const { loading, error, data } = useQuery(GET_USERS);
  const navigate = useNavigate();
  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };
  
  const handleAddUser = (userId) => {
    navigate(`/addUser`);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return [loading, error, data, handleUserClick, handleSignOut, handleAddUser];
}

export default UsersLogic;
