import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px 0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box sx={{display:'flex', gap:'0.5rem'}}>
          {icon}
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
        <Typography variant="h3" sx={{ color: colors.blueAccent[300] }} fontWeight="bold">
          {subtitle}
        </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">

      </Box>
    </Box>
  );
};

export default StatBox;