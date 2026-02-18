import { useState } from "react";

import Sidebar from "../components/Sidebar";

import ChatWindow from "../components/ChatWindow";

import Navbar from "../components/Navbar";


function Chat({

  user,
  setUser

}) {


  const [selectedUser, setSelectedUser] = useState(null);

  const [showSidebar, setShowSidebar] = useState(false);


  const handleLogout = () => {

    setUser(null);

  };


  return (

    <div className="chat-container">


      {/* OVERLAY */}

      {showSidebar && (

        <div

          className="sidebar-overlay"

          onClick={() => setShowSidebar(false)}

        />

      )}


      {/* SIDEBAR */}

      <div

        className={`sidebar-wrapper ${showSidebar ? "show" : ""}`}

      >

        <Sidebar

          user={user}

          setSelectedUser={(u) => {

            setSelectedUser(u);

            setShowSidebar(false);

          }}

          handleLogout={handleLogout}

        />

      </div>



      {/* RIGHT SIDE */}

      <div className="chat-area">


        <Navbar

          user={user}

          selectedUser={selectedUser}

          toggleSidebar={() =>

            setShowSidebar(!showSidebar)

          }

        />


        <ChatWindow

          user={user}

          selectedUser={selectedUser}

        />


      </div>


    </div>

  );

}

export default Chat;
