function Message({

  message,
  own

}) {

  const time = new Date(

    message.createdAt ||

    Date.now()

  ).toLocaleTimeString([], {

    hour: "2-digit",

    minute: "2-digit",

  });


  return (

    <div

      className={`message ${own ? "my" : "other"}`}

    >

      <div>

        {message.text}

      </div>


      {/* TIME + STATUS */}

      <div

        style={{

          fontSize: "11px",

          opacity: 0.8,

          marginTop: "5px",

          textAlign: "right",

          display: "flex",

          justifyContent: "flex-end",

          alignItems: "center",

          gap: "5px"

        }}

      >

        {time}


        {/* TICKS */}


        {own && (

          <span

            className={

              message.seen

                ?

                "tick seen"

                :

                message.delivered

                ?

                "tick delivered"

                :

                "tick sent"

            }

          >

            ✔✔

          </span>

        )}


      </div>


    </div>

  );

}


export default Message;
