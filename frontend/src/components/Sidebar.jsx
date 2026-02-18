import { useEffect, useState } from "react";

import { API_URL } from "../config";


import axios from "axios";

import { socket } from "../socket/socket";


function Sidebar({

  user,
  setSelectedUser,
  handleLogout

}) {

  const [users, setUsers] = useState([]);

  const [activeUser, setActiveUser] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);



  useEffect(() => {

    axios.get(

      `${API_URL}/api/auth/users`


    )

    .then(res => setUsers(res.data));

  }, []);



  useEffect(() => {

    socket.emit(

      "user_connected",

      user._id

    );


    socket.on(

      "online_users",

      (onlineUsersList) => {

        setOnlineUsers(onlineUsersList);

      }

    );


    return () => {

      socket.off("online_users");

    };

  }, [user]);



  return (

    <div className="sidebar">


      {/* HEADER */}


      <div

        style={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          marginBottom: "20px"

        }}

      >


        <h2>ChatSphere</h2>


        <button

          onClick={handleLogout}

          style={{

            padding: "6px 12px",

            borderRadius: "6px",

            border: "none",

            background: "#ef4444",

            color: "white",

            cursor: "pointer"

          }}

        >

          Logout

        </button>


      </div>



      {/* USER LIST */}


      {

        users.map(u => {


          const isOnline =

          onlineUsers.includes(u._id);


          const firstLetter =

          u.username

          .charAt(0)

          .toUpperCase();



          return (

            <div

              key={u._id}

              className={`user-card

              ${activeUser === u._id ? "active" : ""}`}


              onClick={() => {

                setSelectedUser(u);

                setActiveUser(u._id);

              }}

            >


              {/* LETTER AVATAR */}


              <div className="avatar-container">


                <div

                  style={{

                    width: "40px",

                    height: "40px",

                    borderRadius: "50%",

                    background:

                    "#3b82f6",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    fontWeight: "bold",

                    fontSize: "18px",

                    color: "white"

                  }}

                >

                  {firstLetter}

                </div>


                <div

                  className="online-dot"

                  style={{

                    background:

                    isOnline

                    ?

                    "#22c55e"

                    :

                    "gray"

                  }}

                />

              </div>



              <div>


                <div className="username">

                  {u.username}

                </div>


                <div

                  className="status-text"

                  style={{

                    color:

                    isOnline

                    ?

                    "#22c55e"

                    :

                    "gray"

                  }}

                >

                  {

                    isOnline

                    ?

                    "Online"

                    :

                    "Offline"

                  }

                </div>


              </div>


            </div>

          );

        })

      }


    </div>

  );

}


export default Sidebar;
