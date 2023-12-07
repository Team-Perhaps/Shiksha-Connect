import {CircularProgress, Typography, Box } from '@mui/material';


function ModuleProgress(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress className="top-circle" variant="determinate" {...props}/>
            <CircularProgress className="bottom-circle" variant="determinate" value={100} />
        <Box
            sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: "130px",
            width: "130px"
            }}
        >
            <Typography variant="caption" component="div" color="text.secondary" style={{ fontSize: "24px" }}>
                {`${Math.round(props.value)}%`}
            </Typography>
        </Box>
        </Box>
    );
    }
export default ModuleProgress;