import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { themeColor } from "../utils/theme";

export default styled(Button)({
    color: themeColor,
    borderColor: themeColor,
    ":hover": {
        borderColor: themeColor
    }
});