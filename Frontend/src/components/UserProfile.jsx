import { Box, Button, Typography, IconButton, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const ContentBox = ({ data, onCheck, onDelete }) =>     {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
        >
            <Typography
                color={colors.grey[100]}
                variant="h4"
                fontWeight="600"
            > 
                {data.email}
            </Typography>
            <Typography
                color={colors.grey[100]}
                variant="h4"
                fontWeight="600"
            > 
                {data.role}
            </Typography>
            <Box>
                <IconButton onClick={() => onCheck(data.id)} sx={{ color: colors.greenAccent[500] }}>
                    <CheckIcon />
                    </IconButton>
                <IconButton onClick={() => onDelete(data.id)} sx={{ color: colors.redAccent[500] }}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ContentBox;