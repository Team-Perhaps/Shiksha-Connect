import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../config/firebase"
import { collection, query, where, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  


  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      setCurrentUser(user)
      const abc = async()=>{
        if(!user)return
      const q = query(collection(db, "profiles"), where("user_id", "==", user.uid));
      const docSnap = await getDocs(q);
      //console.log(docSnap)
      docSnap.forEach((doc)=>{
        // console.log(doc.data().role)
        setRole(doc.data().role)
        setFirstName(doc.data().firstName)
        setLastName(doc.data().lastName)
        // console.log(doc.data())
      })
      // console.log(role)
    }
    
    abc()
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    role,
    firstName,
    lastName,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}