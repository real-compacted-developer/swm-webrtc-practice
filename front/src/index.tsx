import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import { SocketContext } from "./hooks/useSocket";

ReactDOM.render(
  <React.StrictMode>
    <SocketContext>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat-room/:room/:name" component={ChatRoom} />
        </Switch>
      </BrowserRouter>
    </SocketContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
