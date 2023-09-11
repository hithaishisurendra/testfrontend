/* My code
import React, { createContext,useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const[user,setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats,setChats] = useState([]);
    //notifications

    const history = useHistory(); // add to Homepage also

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);


        //uncomment after adding Homepage
       // if(!userInfo){//
       // history.push('/');//
       // }//
    },[history]);


    return(
    <ChatContext.Provider value={{user,setUser,selectedChat, setSelectedChat, chats,setChats }}>
        {children}
    </ChatContext.Provider>);
};

export const ChatState=()=>{
    return useContext(ChatContext);
};

export default ChatProvider;

*/





// from git repo
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  //const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        //notification,
        //setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

