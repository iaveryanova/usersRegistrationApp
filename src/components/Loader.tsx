

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from '@mui/material/Button';

const Loader = () => {
  const [open, setOpen] = React.useState(true);
  return (

    <div>
    <Backdrop
      sx={{ color: '#ffd700', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
  );
};

export default Loader;
