import React from 'react'
import { ChatState } from "../context/ChatProvider";
import { Box,Text } from '@chakra-ui/layout';

const SingleChat = ({fetchAgain,setFetcheAgain}) => {

    const {user, selectedChat, setSelectedChat} = ChatState();

  return (
    <>
    {selectedChat ? (
        <></>
    ) : (
        // to get socket.io on same page
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}

    </>
  )
}

export default SingleChat
