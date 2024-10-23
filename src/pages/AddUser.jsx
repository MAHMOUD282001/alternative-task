import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  ToggleButton,
} from "@mui/material";
import AddUserLogic from "../logic/AddUserLogic";

function AddUser() {
  const [
    code,
    setCode,
    isTrue,
    error,
    loading,
    handleToggle,
    formData,
    handleChange,
    rolesData,
    deleveryData,
    customerData,
    handleRoleChange,
    handleAccountChange,
    handleSubmit,
  ] = AddUserLogic();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "1500px",
          margin: "auto",
          padding: { xs: "10px", sm: "20px" },
          boxShadow: 2,
          borderRadius: "8px",
        }}
      >
        <ToggleButton
          value="check"
          selected={isTrue}
          onChange={handleToggle}
          color={isTrue ? "success" : "error"}
          sx={{ width: "100px", height: "40px", mb: 5 }}
        >
          {isTrue ? "True" : "False"}
        </ToggleButton>

        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {/* Name Input */}
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <Stack spacing={3}>
              <Autocomplete
                multiple
                fullWidth
                id="tags-outlined"
                options={rolesData?.listRolesDropdown}
                getOptionLabel={(option) => option?.name}
                filterSelectedOptions
                onChange={handleRoleChange}
                getOptionDisabled={(option) =>
                  code === "CSTMR"
                    ? option?.code !== "CSTMR"
                    : code === "DLVRY"
                    ? option?.code !== "DLVRY"
                    : code === "ADMN" ||
                      code === "DTENTRY" ||
                      code === "OPRTN" ||
                      code === "ACCNTNT"
                    ? option?.code === "DLVRY" || option?.code === "CSTMR"
                    : ""
                }
                onClear={() => {
                  setCode("");
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Role" placeholder="Role" />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            {code === "DLVRY" ? (
              <Stack spacing={3}>
                <Autocomplete
                  fullWidth
                  options={deleveryData?.listDeliveryAgentsDropdown}
                  getOptionLabel={(option) => `${option?.name}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Choose a country" />
                  )}
                />
              </Stack>
            ) : code === "CSTMR" ? (
              <Stack spacing={3} sx={{ width: "100%" }}>
                <Autocomplete
                  onChange={handleAccountChange}
                  options={customerData?.listCustomersDropdown}
                  disableCloseOnSelect
                  getOptionLabel={(option) => `${option?.name}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Choose a country" />
                  )}
                />
              </Stack>
            ) : (
              ""
            )}
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default AddUser;
