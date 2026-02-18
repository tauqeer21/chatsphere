import React from 'react'

import ReactDOM from 'react-dom/client'

import App from './App'

import './styles/index.css'


ReactDOM.createRoot(

document.getElementById('root')

).render(

<React.StrictMode>

<App />

</React.StrictMode>

);


// REGISTER SW

if ("serviceWorker" in navigator) {

window.addEventListener("load", () => {

navigator.serviceWorker.register("/sw.js")

.then(() => console.log("SW registered"));

});

}
