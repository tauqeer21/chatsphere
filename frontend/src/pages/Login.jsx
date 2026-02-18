import { useState } from "react";
import axios from "axios";
import Signup from "./Signup";
import { API_URL } from "../config";



function Login({ setUser }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showSignup, setShowSignup] = useState(false);


  const handleLogin = async () => {

    try {

      const res = await axios.post(

        `${API_URL}/api/auth/login`,

        {

          email,
          password

        }

      );

      setUser(res.data.user);

    }

    catch {

      alert("Login failed");

    }

  };


  // SHOW SIGNUP PAGE

  if (showSignup)

    return (

      <Signup

        setUser={setUser}

        goToLogin={() =>

          setShowSignup(false)

        }

      />

    );


  // SHOW LOGIN PAGE

  return (

    <div className="login-page">


      <div className="login-box">


        <h2>ChatSphere</h2>


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


        <button onClick={handleLogin}>

          Login

        </button>


        <p

          style={{

            marginTop: "15px",

            textAlign: "center",

            cursor: "pointer",

            color: "#60a5fa"

          }}

          onClick={() =>

            setShowSignup(true)

          }

        >

          Create account

        </p>


      </div>


    </div>

  );

}


export default Login;
