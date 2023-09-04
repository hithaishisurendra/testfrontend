import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { Box } from '@chakra-ui/layout';
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";
//import chats from "../components/data"


const ChatPage = () => {

  const [fetchAgain, setFetchAgain] = useState(false);
  const {users} = ChatState();


  return( <div style={{width:'100%'}}>
    {<SideDrawer />}
    <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
      {<MyChats fetchAgain={fetchAgain} />} 
      {<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
    </Box>
  </div>
  );
};

export default ChatPage

