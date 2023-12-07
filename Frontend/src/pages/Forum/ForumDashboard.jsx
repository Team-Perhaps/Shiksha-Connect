import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  Button,
  Grid,
  ThemeProvider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import StarIcon from "@mui/icons-material/Star";
import LinkIcon from "@mui/icons-material/Link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import ForumTopbar from "../../components/Forum/ForumTopbar";
import ForumSidebar from "../../components/Forum/ForumSidebar";
import axios from "axios";
import SidebarForum from "../../components/Navbars/Sidebar/sidebarForum";
import { set } from "mongoose";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RightContent from "../../components/Forum/RightContent";


const usePersistedState = (key, defaultValue) => {
  const [state, setState] = React.useState(() => {
    const storedState = localStorage.getItem(key);
    return storedState !== null ? JSON.parse(storedState) : defaultValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const ForumDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isHeader, setIsHeader] = useState(true);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState(null);
  const [upvoted, setUpvoted] = usePersistedState(`upvoted-${posts._id}`, false);
  const [upvotedMap, setUpvotedMap] = usePersistedState('upvotedMap', {});
  const navigate = useNavigate();
  const {currentUser} = useAuth()
  // const postId = "615f9b3b1c9d440001a1b0b0";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://shikshaconnect.vercel.app/api/posts");
        const newData = await response.json();
        newData.reverse();
        setPosts(newData);
      } catch (error) {
        console.error("Error fetching forum posts: ", error);
      }
    };
    fetchData();
  }, []);

  const handleUpvote = async (id) => {
    try {
      if (!upvotedMap[id]) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser.uid }),
        };
        const response = await fetch(`http://localhost:3000/api/posts/${id}/upvote`, requestOptions);

        if (response.ok) {
          // Update the upvoted status for the specific post
          setUpvotedMap((prevMap) => ({ ...prevMap, [id]: true }));
        }
      }
    } catch (error) {
      console.error("Error upvoting post: ", error);
    }
  };
  // console.log(postId);
  const goToPostDetails = (postId) => {
    navigate(`/forum/posts/${postId}`);
  };

  const ColorButton = styled(Button)(() => ({
    backgroundColor: colors.new[200],
    '&:hover': {
      backgroundColor: colors.new[500],
    },
  }));

  return (
    <Box style = {{backgroundColor: colors.new[100]}}>
      <ForumTopbar />
      <Box mt={"64px"} > 
        <Grid container>
          <Grid item xs={2}>
            <SidebarForum />
          </Grid>
          <Grid item xs={10}>
            <Box m="25px" style={{ backgroundColor: "#eaeaea" }}>
              
            {/* Buttons */}
            <Box
              justifyContent="flex-start"
              marginBottom="0px"
              padding="10px 10px 10px"
              sx = {{backgroundColor : colors.new[100]}}
            >
              <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center" margin= "10px 0 10px 0">
                <ColorButton
                  variant="contained"
                  style={{
                    color: "#000",
                    borderRadius: "30px",
                    marginRight: "10px",
                  }}

                  startIcon = {<StarIcon />}
                >
                New
                </ColorButton>
                <ColorButton
                  variant="contained"
                  style={{
                    color: "#000",
                    borderRadius: "30px",
                    marginRight: "10px",
                  }}
                  
                  startIcon = {<ArrowOutwardIcon />}
                >
                Top
                </ColorButton>
                <ColorButton
                  variant="contained"
                  style={{
                    color: "#000",
                    borderRadius: "30px",
                    marginRight: "10px",
                  }}

                  startIcon = {<WhatshotIcon />}
                >
                Hot
                </ColorButton>
                <ColorButton
                  variant="contained"
                  style={{
                    color: "#000",
                    borderRadius: "30px",
                    marginRight: "10px",
                  }}
                  startIcon = {<TaskAltIcon />}
                >
                Closed
                </ColorButton>
              </Stack>
            </Box>

              {/* GRID & CHARTS */}
              <Box
                display="grid"
                gridTemplateColumns="repeat(8, 1fr)"
                gap="0px"
              >
                {/* Left Content */}
                <Box
                  gridColumn="span 6"
                  backgroundColor={colors.new[100]}
                  overflow="auto"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="stretch"
                    padding="1rem"
                  >
                    {posts.map((post) => (
                      <Box
                        key={`${post._id}`}
                        display="flex"
                        alignItems="center"
                        borderBottom={`30px solid ${colors.new[100]}`}
                        marginBottom='20px'
                        borderRadius='10px'
                        padding="50px"
                        // onClick={() => goToPostDetails(post._id)}
                        style={{ cursor: "pointer" }}
                        sx = {{boxShadow: 3}}
                      >
                        {/* Profile Photo */}
                        <Avatar src={post._id} alt={post.userId} />

                        <Box ml={2} flex="1" display="flex" alignItems="center">
                          <Box>
                            {/* User Name */}
                            <Typography
                              color={colors.blueAccent[600]}
                              variant="h5"
                              fontWeight="600"
                              onClick={()=>{goToPostDetails(post._id)}}
                            >
                              {post.title}
                            </Typography>

                            {/* Lorem Ipsum Question */}
                            <Typography color={colors.grey[100]} onClick={()=>{goToPostDetails(post._id)}}>
                              {post.content}
                            </Typography>
                          </Box>

                          {/* Icons */}
                          <Box marginLeft="auto" display="flex" alignItems="center">
                            {/* View Icon */}
                            <IconButton color={colors.grey[800]}>
                              <VisibilityIcon />
                            </IconButton>
                            <Typography color={colors.grey[100]}>
                              {/* {post.title} */}
                            </Typography>

                            {/* Comment Icon */}
                            <IconButton color={colors.grey[800]}>
                              <CommentIcon />
                            </IconButton>
                            <Typography color={colors.grey[100]}>
                              {/* {post.title} */}
                            </Typography>

                            {/* Upvote Icon */}
                            <IconButton
                              color={colors.grey[800]}
                              onClick={() => {
                                handleUpvote(post._id);
                              }}
                              disabled={upvotedMap[post._id]}
                              style={{
                                color: upvotedMap[post._id] ? "#f48023" : "grey",
                              }}
                            >
                              <ThumbUpIcon />
                            </IconButton>
                            <p>{upvotedMap[post._id] ? post.postUpvotes + 1: post.postUpvotes}</p>
                            <Typography color={colors.grey[100]}>
                              {/* {post.title} */}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Right Content */}
              <RightContent />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForumDashboard;
