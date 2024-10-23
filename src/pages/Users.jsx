import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import UsersLogic from "../logic/UsersLogic";

function Users() {
  const [loading, error, data, handleUserClick, handleSignOut, handleAddUser] = UsersLogic();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h3" component="div">
          All Users
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>

          <Button variant="contained" color="secondary" onClick={handleAddUser}>
            Add User
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {data.listUsers.data.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{ minWidth: 275, cursor: "pointer" }}
              onClick={() => handleUserClick(user.id)}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {user.username}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Users;
