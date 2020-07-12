import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const context = createContext<SocketIOClient.Socket | undefined>(undefined);

export const SocketContext: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export const useSocket = () => useContext(context);
