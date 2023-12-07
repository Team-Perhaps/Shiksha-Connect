import React, { useState } from 'react'
import {
    Box,
    Typography,
    IconButton,
    Avatar,
    useTheme,
    Button,
    Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import ForumTopbar from "../../components/Forum/ForumTopbar";
import ForumSidebar from "../../components/Forum/ForumSidebar";
import axios from 'axios';

const ForumProfile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [profilePicture, setProfilepicture] = useState(null);

    const handleProfilePictureChange = (event) => {
        setProfilepicture(event.target.files[0]);
        setProfilepicture(file);
    };

    const handleProfileUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("firstname", firstName);
            formData.append("lastname", lastName);
            formData.append("profilepicture", profilePicture);
            const response = await axios.post("http://localhost:3000/api/users/profile", formData);
            console.log(response);

            setFirstname("");
            setLastname("");
            setProfilepicture(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
          <ForumTopbar />
          <Grid container>
            <Grid item xs={2}>
              <ForumSidebar />
            </Grid>
            <Grid item xs={10}>
              <Box m="20px" style={{ backgroundColor: "#eaeaea" }}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  marginBottom="10px"
                  padding="10px 55px"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: colors.grey[800],
                      color: "#000",
                      borderRadius: "30px",
                      marginRight: "10px",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = colors.blueAccent[600])
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = colors.grey[800])
                    }
                  >
                    <StarIcon /> New
                  </Button>
                  {/* ... Other buttons ... */}
                </Box>
    
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(8, 1fr)"
                  gap="20px"
                >
                  <Box gridColumn="span 6" backgroundColor={colors.blueAccent[900]} overflow="auto">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="stretch"
                      padding="1rem"
                    >
                      {/* Profile Picture Upload */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                      />
    
                      <Avatar
                        src={profilePicture}
                        alt="Profile Picture"
                      />
    
                      {/* First Name and Last Name Input */}
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
    
                      {/* Button to Update Profile */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleProfileUpdate}
                      >
                        Update Profile
                      </Button>
                    </Box>
                  </Box>
                  <Box gridColumn="span 2" backgroundColor="#ffffff" padding="15px">
                    {/* Right Content */}
                    <Box>
                      {/* ... Other content ... */}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
    );
};
    
export default ForumProfile;