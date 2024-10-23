import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      username
      active
      roles {
        id
        name
      }
    }
  }
`;

function UserLogic(userId) {
  const id = parseInt(userId, 10);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: id },
  });

  return [loading, error, data];
}

export default UserLogic;
