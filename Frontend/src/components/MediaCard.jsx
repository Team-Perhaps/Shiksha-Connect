import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PDF from '../assets/PDF_Icon2.png';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const blurredIconStyle = {
  filter: 'blur(5px)',
};

export default function MediaCard(props) {
  
    return (
      <Card sx={{width: 190, margin: 2}}>
        <CardMedia
          sx={{ height:150, ...blurredIconStyle }}
          image={PDF}
          title="PDF"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {props.year} - {props.subject} 
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{
            window.location.href = props.url;
          }}>View/Download</Button>
          
        </CardActions>
      </Card>
    );
  }