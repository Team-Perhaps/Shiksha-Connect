import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import LinkIcon from "@mui/icons-material/Link";

const RightContent = () => {
  return (
    <Box gridColumn="span 2" backgroundColor="#ffffff" padding="15px" sx={{height: "100%", width: "100%", borderRadius: "10px", boxShadow: 3}}>
      <Box >
        <Typography variant="h4">
          <StarOutlineOutlinedIcon style={{ verticalAlign: "middle" }} /> Must Read Posts
        </Typography>
        <Divider />
        <ul>
          <li>
            <a href="https://github.com/">GitHub</a>
          </li>
          <li>
            <a href="https://stackoverflow.com/">Stack Overflow</a>
          </li>
          <li>
            <a href="#">Post 3</a>
          </li>
        </ul>
      </Box>
      <Box marginTop="20px">
        <Typography variant="h4">
          <LinkIcon style={{ verticalAlign: "middle" }} /> Featured Links
        </Typography>
        <Divider />
        <ul>
          <li>
            <a href="#">Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
          <li>
            <a href="#">Link 3</a>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default RightContent;