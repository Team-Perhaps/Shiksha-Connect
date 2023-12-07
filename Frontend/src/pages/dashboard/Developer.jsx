import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Header from "../../components/Header";
import LineChart from "../../components/charts/LineChart";
import GeographyChart from "../../components/charts/GeographyChart";
import BarChart from "../../components/charts/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import { styled } from '@mui/material/styles';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ColorButton = styled(Button)(() => ({
    backgroundColor: "#0B409C",
    '&:hover': {
      backgroundColor: "#11316E",
    },
  }));

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <ColorButton
            sx={{
              backgroundColor: colors.blueAccent[300],
              color: colors.blueAccent[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </ColorButton>
        </Box>
      </Box>


      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Comments Received"
            subtitle={<span style={{ color: colors.blueAccent[600]}}>400</span>}
            icon={
              <MoveToInboxRoundedIcon
                sx={{ color: colors.blueAccent[300], fontSize: "30px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Comments Resolved"
            subtitle={<span style={{ color: colors.blueAccent[600]}}>200</span>}
            icon={
              <FactCheckRoundedIcon
                sx={{ color: colors.blueAccent[300], fontSize: "30px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.grey[50]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Comments

            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.grey[50]}`}
              p="15px"
              // gap={"20rem"}
            >
              <Box sx={{width: "40%"}}>
                <Typography
                  color={colors.blueAccent[600]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.blueAccent[300]}
                p="5px 20px"
                borderRadius="4px"
                color = {colors.blueAccent[900]}
              >
                OPEN
              </Box>
            </Box>
          ))}

          {/* Row 3 */}
        </Box>


      </Box>
    </Box>
  );
};

export default Dashboard;