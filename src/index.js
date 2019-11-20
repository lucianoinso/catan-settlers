import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import axios from "axios";

// Inicializar header.
// Lo muevo acá para asegurarme que *todas* las peticiones se envíen con el header.
// (Antes esto estaba en Login.ducks, y pasaba que las primeras peticiones
//  --antes que se cargue el Login.ducks-- se enviaban sin header).
if (localStorage.getItem("token"))
  axios.defaults.headers.common[
    "Authorization"
  ] = `Token ${localStorage.getItem("token")}`;

ReactDOM.render(<App />, document.getElementById("root"));
