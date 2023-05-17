import { GoogleLogout } from "react-google-login";
import { Gradient } from "../../constants/Gradients";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Textarea from '@mui/joy/Textarea';
import { Button } from "@mui/joy";


function Settings() {
   
 
  const [bio, setbio] = useState("");
  const { userid, bio1  } = useParams();

  useEffect(() => {

    setbio(bio1);   
}, []);

function sendData(e) {              //create event(e) for pass the varible aming the input fileds
     
  e.preventDefault()               //if someone send data from any iput fiiled add data into new object varible

  const newBio = {

      bio 
      
  }

  axios.put(`http://localhost:8080/api/v1/user/updateUserbio/${userid}`, newBio).then(()=>{  //if new object have values,then post that into backend
   alert("BIO Updated")  
  }).catch((err)=> {
      alert(err)

  })


}


                                            //DELETE USER PROFILE
const onDelete = (userid) => {
 
  axios.delete(`http://localhost:8080/api/v1/user/deleteUser/${userid}`).then((res) => {
  alert("Card Deleted Successfully")
 });
};

  const navigate = useNavigate();

  const onLogoutSuccess = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={`${Gradient} flex flex-col gap-1 w-full h-screen items-center justify-center`}
    >
      <form  onSubmit={sendData}>  
     
           
      <FormControl onSubmit={sendData}>
      <FormLabel>Bio</FormLabel>

      <Textarea placeholder="Enter Your Bio" style={{ width: '300px' }} minRows={3} defaultValue={bio}
       onChange={(e) => {
        setbio(e.target.value);
    }}
    
      />
     
    </FormControl>
   <br/>
    <div
      className="flex items-center justify-center"
    >
    <Button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"     onClick={() => { window.location.href = "/profile/my" }}>Submit</Button>
    </div>
    <br/>
    </form>
    
      <h1 className="font-medium">Warning!</h1>
      
      <GoogleLogout
        render={(renderProps) => (
          <button  type="submit"
           
           onClick={() => {
            renderProps.onClick();
            onDelete(userid);
          }}
         
            className="bg-secondary py-1 px-4 text-white font-bold rounded-md"
          >
            Delete Account
          </button>
        )}
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export default Settings;
