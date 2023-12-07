import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { auth, db } from '../../config/firebase';
import ContentBox from '../../components/UserProfile';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';


export default function Verification() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [linkArr, setLinkArr] = useState([]);
  const [del, setDel] = useState(0);
  const navigate = useNavigate();

  const getLinks = async () => {
    const q = query(collection(db, "verify"));
    const docSnap = await getDocs(q);

    const arr = [];
    docSnap.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setLinkArr(arr);
  };

  const dbRef = collection(db, "profiles");

  async function confirm(item) {
    try {
      var fin = await createUserWithEmailAndPassword(auth, item.email, item.password);
    } catch (err) {
      console.log(err);
    }

    const data = {
      role: item.role,
      user_id: fin.user.uid,
      email: item.email,
      firstName: item.firstName,
      lastName: item.lastName,
    };
    addDoc(dbRef, data)
      .then(() => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    const q = query(doc(db, "verify", item.id));
    await deleteDoc(q);
    setDel(del + 1);

    await signInWithEmailAndPassword(auth, import.meta.env.VITE_ADMIN, import.meta.env.VITE_PASS);
  }

  async function notConfirm(item) {
    const q = query(doc(db, "verify", item.id));
    await deleteDoc(q);
    setDel(del + 1);
  }

  useEffect(() => {
    getLinks();
  }, [del]);

  // Function to filter out duplicates based on email
  const filterDuplicates = (array) => {
    const uniqueArray = [];
    const uniqueEmails = new Set();

    for (const item of array) {
      if (!uniqueEmails.has(item.email)) {
        uniqueEmails.add(item.email);
        uniqueArray.push(item);
      }
    }

    return uniqueArray;
  };

  const uniqueLinkArr = filterDuplicates(linkArr); // Filter out duplicates

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>Email</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Role</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueLinkArr.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ textAlign: 'center' }}>{item.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.role}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    color="primary"
                    onClick={() => confirm(item)}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => notConfirm(item)}
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}