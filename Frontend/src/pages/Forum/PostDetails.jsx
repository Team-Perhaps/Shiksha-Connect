import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    IconButton,
    Avatar,
    useTheme
} from '@mui/material';
import ThumbUp from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ForumTopbar from '../../components/Forum/ForumTopbar';
import SidebarForum from '../../components/Navbars/Sidebar/sidebarForum';

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`https://shikshaconnect.vercel.app/api/posts/${postId}`);
            const data = await response.json();
            setPost(data);
        }
        fetchPost();
    }, [postId]);

    return (
        <Box>
            <ForumTopbar />
            <SidebarForum />
          {post && (
            <Box>
              <Typography variant="h3">{post.title}</Typography>
              <Typography variant="body1">{post.content}</Typography>
            </Box>
          )}
          <Typography variant="h4">Comments</Typography>
          {comments.map((comment) => (
            <Box key={comment.id} mb={2}>
              <Avatar src={comment.userAvatar} alt={comment.username} />
              <Box ml={2}>
                <Typography variant="h6">{comment.username}</Typography>
                <Typography variant="body2">{comment.text}</Typography>
              </Box>
            </Box>
          ))}
          {/* Add a comment form here if needed */}
        </Box>
    );
};
    
export default PostDetails;