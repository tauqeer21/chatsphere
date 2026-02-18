import { useState } from "react";

import Login from "./pages/Login";

import Chat from "./pages/Chat";


function App() {


  const [user, setUser] = useState(null);


  return (

    <>

      {

        user

        ?

        <Chat

          user={user}

          setUser={setUser}

        />

        :

        <Login

          setUser={setUser}

        />

      }

    </>

  );

}


export default App;
