import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import UserLogic from "../logic/UserLogic";

function User() {
  
  const { userId } = useParams();
  
  const [loading, error, data] = UserLogic(userId);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card sx={{ minWidth: 275, cursor: "pointer" }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.user.username}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default User;
