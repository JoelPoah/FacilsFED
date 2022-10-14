import React,{useState,useEffect} from 'react'
import PropTypes from "prop-types";
import {
  VStack,
  StackDivider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  color,
} from "@chakra-ui/react";



function Returned() {
    const [loanedList, setLoanList] = useState([]);
    const [returnedList, setReturnedList] = useState([]);

    useEffect(() => {
      async function fetchDataList() {
        try {
          const requestUrl = "http://localhost:3001/dashboard";
          const response = await fetch(requestUrl);
          const responseJSON = await response.json();
          // filter dataList where returned ==1
          const inloan = responseJSON.filter((item) => item.returned === 0);
  
          setLoanList(inloan);
          const returned = responseJSON.filter((item) => item.returned === 1);
  
  
          setReturnedList(returned);
        } catch {
          console.log("failed to fetch data list");
        }
      }
      fetchDataList();
    }, []);

  return (
    <>
    <br></br>
      <Alert status="success" variant="top-accent" px="36%" py='3%'>
        <AlertIcon />
        Completed transactions are shown below
      </Alert>
      <br></br>
      <Flex color="green.200" w="100%" px="11%">
        <VStack
          w="100%"
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr >
                  <Th>BookingID</Th>
                  <Th>Username</Th>
                  <Th>Item ID</Th>
                  <Th isNumeric>Phone Number</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {returnedList.map((post) => (
                  <>
                    <Tr >
                      <Td>{post.Booking_ID}</Td>
                      <Td>{post.Name}</Td>
                      <Td>{post.Item_Name}</Td>
                      <Td isNumeric>{post.Phone}</Td>
                      <Td>{post.Datetime}</Td>
                    </Tr>

                    {/* <li key={post.ItemID}>{post.Name}</li> */}
                  </>
                ))}
              </Tbody>

              <Tfoot>
                <Tr>
                  <Th>BookingID</Th>
                  <Th>Username</Th>
                  <Th>Item ID</Th>
                  <Th isNumeric>Phone Number</Th>
                  <Th>Date</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </VStack>
      </Flex>
    </>
  )
}

export default Returned