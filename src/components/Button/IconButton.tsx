import { styled } from "@mui/material";
import MUIButton from "@mui/material/Button";

export default styled(MUIButton)((props) => {
    return {
        minWidth: 0,
        color: "white",
        ...props.style,
    };
});
