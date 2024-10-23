import { Box, Button, Grid, TextField } from "@mui/material";
import LoginLogic from "../logic/LoginLogic";

function Login() {
  const [handleSubmit, loading, error, formData, handleChange] = LoginLogic() 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message} :(</p>;
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        boxShadow: 2,
        borderRadius: "8px",
      }}
    >
      <Grid container spacing={2}>
        {/* Name Input */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Password Input */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
