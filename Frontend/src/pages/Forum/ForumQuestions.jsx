import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  useTheme,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import ForumTopbar from "../../components/Forum/ForumTopbar";
import SidebarForum from "../../components/Navbars/Sidebar/sidebarForum";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import LinkIcon from "@mui/icons-material/Link";
import { useAuth } from "../../contexts/AuthContext";
import RightContent from "../../components/Forum/RightContent";
import FileUpload from "../../components/FileUpload";

const ForumQuestions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const {firstName, lastName, currentUser} = useAuth()
  const fullName = firstName + " " + lastName;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the server)
    // You can access the values of category, title, and question here.
  };

  const createPost = async () => {
    console.log("TEST")
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name: fullName, title, content: question, userId: currentUser.uid})
      }
        const response = await fetch("https://shikshaconnect.vercel.app/api/posts/", requestOptions);
       console.log("Post Created " + response)
       navigate("/forum")
      } catch (error) {
        console.error("Error upvoting post: ", error);
      }
    
      
    }
    


  return (
    <Box>
      <ForumTopbar />
      <Box mt={"64px"}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <SidebarForum />
          </Grid>
          <Grid item xs={7} style={{padding: '45px', paddingLeft: '60px', paddingRight: 10}}>
            <Box
              m="25px"
              style={{
                backgroundColor: "white",
                border: `1px solid ${colors.grey[300]}`,
                borderRadius: "10px",
                padding: "20px",
                paddingLeft: "20px",
              }}
            >
              <Typography variant="h4"
                sx={{ marginBottom: '20px' }}
              >Ask a Question</Typography>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{ marginBottom: '10px' }}
                >
                  {/* Category Dropdown */}
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    <MenuItem value="Category1">Data Structures</MenuItem>
                    <MenuItem value="Category2">Applied Mathematics</MenuItem>
                    <MenuItem value="Category3">Compiler Design</MenuItem>
                    <MenuItem value="Category4">Analysis of Algorithms</MenuItem>
                    <MenuItem value="Category5">Integral Transform</MenuItem>
                    <MenuItem value="Category6">Digital Design</MenuItem>
                    {/* Add more categories as needed */}
                  </Select>
                </Box>
                <Box
                  sx={{ marginBottom: '10px' }}
                >
                  {/* Title Input */}
                  <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Box>
                <Box
                  sx={{ marginBottom: '10px' }}
                >
                  {/* Question Input */}
                  <TextField
                    label="Your Question"
                    fullWidth
                    multiline
                    rows={5}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </Box>
                <FileUpload degree="forum" year="posts" subject="postid" name={title} flag={true}/>
                <Box>
                  <Button onClick={createPost} type="submit" variant="contained" color="primary" style={{ backgroundColor: '#f48023' }}>
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
          <Box item xs={3} style={{paddingTop: 65, height: '70%', width : '20%'}}>
            {/* Right Side Component (from ForumDashboard) */}
            <RightContent />
            </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForumQuestions;
