import { CircularProgress, Grid } from "@mui/material";

const Loader = () => {
  return (
    <Grid container justifyContent="center">
      <CircularProgress sx={{ marginTop: "4rem" }} size={100} />
    </Grid>
  );
};

export default Loader;
