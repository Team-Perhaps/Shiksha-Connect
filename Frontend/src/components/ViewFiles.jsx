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
import { TextField, Grid } from '@mui/material';
import MediaCard from './MediaCard';
import { getFirestore, collection, setDoc, addDoc, query, where, getDocs} from "firebase/firestore";



function ViewFiles() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [path, setPath] = useState('')
    const [count, setCount] = useState(0)
    const [linkArr, setLinkArr] = useState([]);



    const [degree, setDegree] = useState('test')
    const [year, setYear] = useState('test')
    const [subject, setSubject] = useState('test')
    const [type, setType] = useState('test')
    const [name, setName] = useState('test')
    
    const imagesListRef = ref(storage, `${degree}/${year}/${subject}/${type}`);
    const dbRef = collection(db, "Files")

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
    }, []);
    return (
      <div>
        <Grid container spacing={4} margin={5}>
          {linkArr.map((item) => (
            <MediaCard margin={8} url={item.link} subject={item.subject} name={item.name} type={item.type} key={item.id} />
          ))}
        </Grid>
      </div>
    )
  }
  
  export default ViewFiles;