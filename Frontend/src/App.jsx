import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { v4 as uuidV4 } from "uuid";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Topbar from "./scenes/global/Topbar";
import SidebarAdmin from "./components/Navbars/Sidebar/sidebarAdmin";
import SidebarDev from "./components/Navbars/Sidebar/sidebarDev";
import SidebarTeach from "./components/Navbars/Sidebar/sidebarTeach";
import SidebarForum from "./components/Navbars/Sidebar/sidebarForum";
import Logout from "./components/Logout";

// Import pages
import Dashboard from "./pages/dashboard/Dashboard";
import Contacts from "./pages/contacts/Contacts";
import Team from "./pages/team/Team";
import Invoices from "./pages/invoices/Invoices";
import Form from "./pages/form/Form";
import Bar from "./pages/bar/Bar";
import Geography from "./pages/geography/Geography";
import Line from "./pages/line/Line";
import Pie from "./pages/pie/Pie";
import FAQ from "./pages/faq/Faq";
import Calendar from "./pages/calander/Calender";
import Admin from "./pages/dashboard/Admin";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import Stats from "./pages/stats/Stats";
import Verification from "./pages/login/Verification";
import Private from "./components/Private";
import ConDashboard from "./pages/dashboard/ConDashboard";
import DevelopCurriculum from "./pages/DevelopCurriculum";
import FileUpload from "./components/FileUpload";
import ViewFiles from "./components/ViewFiles";
import ResourcePage from "./components/ResourcePage";
import TextEditor from "./components/TextEditor";
import Editor from "./components/Editor";
import ForumDashboard from "./pages/Forum/ForumDashboard";
import ForumProfile from "./pages/Forum/ForumProfile";
import PostDetails from "./pages/Forum/PostDetails";
import ForumQuestions from "./pages/Forum/ForumQuestions";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { role } = useAuth();
  console.log(role);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  useEffect(() => {
    if (openSnackBar) {
      const timeoutId = setTimeout(() => {
        setOpenSnackBar(false);
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [openSnackBar]);

  const shouldShowSidebar =
    location.pathname !== "/login" && 
    location.pathname !== "/register" &&
    location.pathname !== "/header" &&
    !location.pathname.startsWith("/forum");

  const shouldShowTopbar = 
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/header" &&
    location.pathname !== "/forum" &&
    !location.pathname.startsWith("/forum");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* Snackbar */}
          <Snackbar
            open={openSnackBar}
            onClose={handleCloseSnackBar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="success"
              onClose={handleCloseSnackBar}
            >
              {message}
            </MuiAlert>
          </Snackbar>

          <div className="app">
            {shouldShowSidebar && ( // Render the Sidebar conditionally
              <div
                className={`sidebar ${isSidebar ? "extended" : ""}`}
                style={{
                  height: isSidebar ? "100%" : "100%",
                  overflowY: isSidebar ? "visible" : "hidden",
                  transition: "height 0.3s",
                }}
              >
                {role == "teacher" && <SidebarTeach isSidebar={isSidebar}/>}
                {role == "localadmin" && <SidebarAdmin isSidebar={isSidebar}/>}
                {role == "currdev" && <SidebarDev isSidebar={isSidebar}/>}
                {role == "admin" && <SidebarAdmin isSidebar={isSidebar}/>}
                {role == "forum" && <SidebarForum isSidebar={isSidebar}/>}
                
              </div>
            )}
            <main className="content">
            {shouldShowTopbar && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route exact path="/" element={<Private />}>
                  <Route exact path="/" element={<ConDashboard />} />
                </Route>
                <Route path="/developer" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route
                  path="/register"
                  element={
                    <Signup
                      openSnackBar={openSnackBar}
                      setOpenSnackBar={setOpenSnackBar}
                      message={message}
                      setMessage={setMessage}
                    />
                  }
                />
                <Route path="/login"element={<Login openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} message={message} setMessage={setMessage} /> } />
                <Route path="/verify" element={<Verification />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/develop" element={<DevelopCurriculum />} />
                <Route path="/file" element={<FileUpload />} />
                <Route path="/view" element={<ViewFiles />} />
                <Route path="/resources" element={<ResourcePage />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/editor" element={<TextEditor />} />
                <Route path="/forum" element={<ForumDashboard />} />
                <Route path="/forum/profile" element={<ForumProfile />} />
                <Route path="/forum/posts/:postId" element={<PostDetails />} />
                <Route path="/forum/questions" element={<ForumQuestions />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
