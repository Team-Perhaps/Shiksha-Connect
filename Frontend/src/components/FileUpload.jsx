import React from 'react'
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { db, storage } from '../config/firebase'
import { v4 } from "uuid";
import { TextField, Grid, Typography, Box, Container } from '@mui/material';
import MediaCard from './MediaCard';
import HorizontalStepper from './HorizontalStepper';
import { getFirestore, collection, setDoc, addDoc, query, where, getDocs} from "firebase/firestore";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { MuiFileInput } from 'mui-file-input'




function FileUpload(props) {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [path, setPath] = useState('')
    const [count, setCount] = useState(0)
    const [linkArr, setLinkArr] = useState([]);



    // const [degree, setDegree] = useState('B. Tech')
    // const [year, setYear] = useState('2nd Year')
    // const [subject, setSubject] = useState('Data Structures')
    const [type, setType] = useState('')

    const {degree, branch, year, subject, xname, flag} = props;
    const [name, setName] = useState(xname)

    const getColor = () => {
      if(flag)return "#F48023"
      return "#0E2038"
    }
    
    const imagesListRef = ref(storage, `${degree}/${year}/${subject}/`);
    const dbRef = collection(db, "Files")
    
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `${degree}/${year}/${subject}/${name}`);

        const metadata = {
            name: {name},
        }
        
        uploadBytes(imageRef, imageUpload, metadata).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            setImageUrls((prev) => [...prev, url]);
            const data = {
              subject: subject,
              link: url,
              name: name,
              type: type,
            };
            addDoc(dbRef, data)
            .then(docRef => {
              setCount(count + 1)
                console.log("Document has been added successfully");
            })
            .catch(error => {
                console.log(error);
            })


        });
        
        });
    };

    const ColorButton = styled(Button)(() => ({
      backgroundColor: "#0B409C",
      '&:hover': {
        backgroundColor: getColor(),
      },
    }));

    const handleChange = (newValue) => {
      setImageUpload(newValue)
    }

    useEffect(() => {

      const getLinks = async() => 
      {
        
          const q = query(collection(db, "Files"), where("subject", "==", subject));
          const docSnap = await getDocs(q);
  
          const arr = [];
          docSnap.forEach((doc) => {
              arr.push({...doc.data(), id:doc.id});
            });
          setLinkArr(arr);
      };
  
      getLinks();
    }, [count]);

return (
  <Box sx={{p: 2}}>
    <MuiFileInput value={imageUpload} onChange={handleChange} fullWidth/>
        <TextField
                    variant='filled'
                    color='secondary'
                    label="Name"
                    
                    onChange={(event) => {
                        setName(event.target.value);
                      }}
                    
                    fullWidth
                    required
                    sx={{mb: 2, marginTop: "20px"}}
        />
        <Typography textAlign = 'center'>
        <ColorButton sx={{backgroundColor: getColor()}}component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={()=>{uploadFile();}} size = 'large'>Upload file
      {/* <VisuallyHiddenInput type="file" /> */}
      </ColorButton>
        </Typography>

      
      {!flag && <Grid container spacing={4} margin={1}>
        
        {linkArr.map((item) => (
            // console.log("HI3"
            <MediaCard
              style={{
                height: '200px !important',   
              }}
              margin={2} 
              url={item.link} 
              subject={item.subject} 
              name = {item.name} 
              type = {item.type} 
              key = {item.id}
              />
        ))}
      </Grid>}
      
    </Box>

    
  )
}

export default FileUpload