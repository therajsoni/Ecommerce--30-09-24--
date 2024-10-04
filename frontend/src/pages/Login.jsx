import { useState } from 'react'
import {FcGoogle} from "react-icons/fc"
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {useLoginMutation} from "../redux/api/userAPi";
import {auth} from '../Firebase.js'

const Login = () => {

    const [gender,setGender] = useState("")
    const [date,setDate] = useState("")

   const [login] = useLoginMutation()


    const loginHandler = async() => {
try {
  const provider = new GoogleAuthProvider();
  const {user} =   await signInWithPopup(auth,provider);
  
  const res = await login({
    name : user.displayName,  // firebase provide
    email : user.email, // firebase provide
    photo: user.photoURL,      // firebase provide
    gender : gender,
    role:"user",
    dob : date,
    _id : user.uid
  })
  
  if ("data" in res) {
    toast.success(res.data.message);
    try {
        const data = await getUser(user.uid);
        console.log(data);    
    } catch (err) {
        console.error("Error getting user:", err);
    }
} else {
    const error = res.error;
    const message = error?.data?.message || "An unknown error occurred.";
    toast.error(message);  // Display the error message
}


  console.log(user);
    
} catch (error) {
console.log(error);

  toast.error("Sign In Failed");

}

    }

  return (
    <div className='login'>
      <main>
        <h1 className='heading'>Login</h1>
        <div>
            <label htmlFor=''>Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)}>
                <option value={""} >Select Gender</option>
                <option value={"male"} >Male</option>
                <option value={"female"} >Female</option>
            </select>
        </div>

        <div>
            <label htmlFor=''>Date of birth</label>
             <input type='date' value={date} onChange={(e) => setDate(e.target.value)} /> 
        </div> 

<div>
    <p>Already Signed In Once</p>
    <button onClick={loginHandler} ><FcGoogle/><span>Sign in with Google</span>
    </button>
</div>

      </main>
    </div>
  )
}

export default Login
