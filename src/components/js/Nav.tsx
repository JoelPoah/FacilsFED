// import {  useState } from 'react';

import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";

export default function Nav() {
  const navigate = useNavigate();

  // const [username, setUsername] = useState("User");

  // setUsername('User');

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
   
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box boxSize="sm">
            <Image src="" />
          </Box>
          

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
            {localStorage.getItem("token") !== null &&
              window.location.pathname != "/AddItems" ? (
                <Button
                  colorScheme="red"
                  onClick={() => {
                    navigate("/AddItems");
                  }}
                >
                  Add Items
                </Button>
              ) : null}
                          {localStorage.getItem("token") !== null &&
              window.location.pathname != "/AddCertified" ? (
                <Button
                  colorScheme="pink"
                  onClick={() => {
                    navigate("/AddCertified");
                  }}
                >
                  Add Certified
                </Button>
              ) : null}

              {localStorage.getItem("token") !== null &&
              window.location.pathname != "/loan" ? (
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    navigate("/loan");
                  }}
                >
                  Book Now
                </Button>
              ) : null}
              {localStorage.getItem("token") !== null &&
              window.location.pathname != "/dashboard" ? (
                <Button
                  colorScheme="yellow"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Loaned Items
                </Button>
              ) : null}
              {localStorage.getItem("token") !== null &&
              window.location.pathname != "/ItemsReturned" ? (
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    navigate("/ItemsReturned");
                  }}
                >
                  Returned Items
                </Button>
              ) : null}
              {localStorage.getItem("token") !== null ||
              window.location.pathname == "/" ? (
                <Button colorScheme="purple" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button colorScheme="blue" onClick={() => navigate("/")}>
                  Login
                </Button>
              )}
              {/* {localStorage.getItem("current")==="login" ? <Button colorScheme="pink" onClick={()=>{navigate("/")}}>SignUp</Button>: null } */}

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p> User</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Dashboard</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
