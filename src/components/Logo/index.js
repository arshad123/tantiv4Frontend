import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";

// project import
import Logo from "./Logo";
import config from "config";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
  <ButtonBase disableRipple component={Link} sx={sx}>
    Arshad Faiyaz
  </ButtonBase>
);

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;