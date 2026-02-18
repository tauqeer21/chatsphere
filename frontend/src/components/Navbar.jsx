function Navbar({

  user,
  toggleSidebar,
  selectedUser

}) {

  // SHOW SELECTED USER OR OWN USER

  const currentUser =
    selectedUser ? selectedUser : user;


  const firstLetter =
    currentUser.username
      .charAt(0)
      .toUpperCase();


  return (

    <div className="chat-header">


      {/* LEFT SIDE */}

      <div

        style={{

          display: "flex",
          alignItems: "center",
          gap: "10px"

        }}

      >


        {/* MOBILE MENU BUTTON */}

        <button

          className="menu-btn"

          onClick={toggleSidebar}

        >

          ☰

        </button>



        {/* LETTER AVATAR */}

        <div

          style={{

            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#3b82f6",
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



        {/* USER INFO */}

        <div>


          <div>

            {currentUser.username}

          </div>


          <div

            style={{

              fontSize: "12px",
              color: "#22c55e"

            }}

          >

            Online

          </div>


        </div>


      </div>


    </div>

  );

}

export default Navbar;
