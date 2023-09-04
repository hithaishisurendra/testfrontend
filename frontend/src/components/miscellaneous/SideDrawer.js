import { Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuDivider, MenuItem } from '@chakra-ui/react';
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons';
import React, { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import ProfileModal from './ProfileModal';
import { ChatState } from '../../context/ChatProvider';
import {useHistory} from "react-router-dom"
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Input } from "@chakra-ui/input";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { Spinner } from "@chakra-ui/spinner";

const SideDrawer = () => {
  
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState(false);
  const [loadingChat,setLoadingChat] = useState();

  
  const toast = useToast();
  const {user, setSelectedChat,chats,setChats} = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();


  //Logout from page
    const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  //Search bar inside Sidebar
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search bar",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    //To show loading and then display searched chats
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }


//Access the chats from the Sidebar after Search

const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

    
    return(
    <>
    <Box display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">
      <Tooltip label="Search Users" hasArrow placement='bottom-end'>
        <Button variant='ghost' onClick={onOpen}>
          <i class="fas fa-search"></i>
          <Text display={{base:"none",md:"flex"}} px="4">Search Users</Text>
        </Button>
      </Tooltip>
      <Text fontSize="2xl" fontFamily="Work sans">Telstra Team 2</Text>
      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize="2xl" m={1}></BellIcon>
            {/*<MenuList></MenuList>*/}
          </MenuButton>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                //name={user.name}
                //src={user.pic}
              />
          </MenuButton>
              <MenuList>
                <ProfileModal>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
        </Menu>
      </div>
    </Box>

    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
              onClick={handleSearch}
              >
                Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
              )}
              {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
    );
    
  
};

export default SideDrawer;

