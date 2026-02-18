import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";



function Signup({

  setUser,
  goToLogin

}) {


  const [username, setUsername] =
  useState("");

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");



  const handleSignup = async () => {

    try {

      await axios.post(

        `${API_URL}/api/auth/signup`
,

        {

          username,
          email,
          password

        }

      );


      alert("Signup successful");


      goToLogin();


    }

    catch {

      alert("Signup failed");

    }

  };



  return (

    <div className="login-page">


      <div className="login-box">


        <h2>Signup</h2>


        <input

          placeholder="Username"

          onChange={(e) =>
          setUsername(e.target.value)}

        />


        <input

          placeholder="Email"

          onChange={(e) =>
          setEmail(e.target.value)}

        />


        <input

          type="password"

          placeholder="Password"

          onChange={(e) =>
          setPassword(e.target.value)}

        />


        <button onClick={handleSignup}>

          Signup

        </button>


        <p

          style={{

            marginTop: "15px",

            textAlign: "center",

            cursor: "pointer",

            color: "#60a5fa"

          }}

          onClick={goToLogin}

        >

          ← Back to Login

        </p>


      </div>


    </div>

  );

}


export default Signup;
