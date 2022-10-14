import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import axios from 'axios'

  
  export default function SimpleCard() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    // $("#login-form").submit((event) => {
    //     // prevent page reload
    //     event.preventDefault();

    //     const username = $("#username").val();
    //     const password = $("#password").val();
    //     console.log(typeof(password));



        const requestBody = {
            Username: email,
            Password: password
        };

        function login(){
          axios.post('http://localhost:3001/login', requestBody)
          .then((response) => {
              localStorage.setItem('token', response.data.token)
              navigate('/dashboard')

          })
        }


    

    return (
      <Flex
        minH={'80vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Hope Church Facilities</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              App for loaning <Link color={'blue.400'}>items</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email"  value={email}
          onChange={(e) => setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Stack >
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'} >Forgot your password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={login}
                  >
                  Sign in
                </Button>
                <Button
                  bg={'red.400'}
                  color={'white'}
                  _hover={{
                    bg: 'red.500',
                  }}
                  onClick={() => navigate('/loan')}
                  >
                    Continue as member
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }