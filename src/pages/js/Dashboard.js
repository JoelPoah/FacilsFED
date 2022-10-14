import React, { useEffect } from "react";
import { useState } from "react";
import {
  VStack,
  StackDivider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Alert,
  AlertIcon,
  Button,
  AlertTitle,
  AlertDescription,
  color,
  Checkbox,
  data,
  useToast,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

function Dashboard() {
  const toast = useToast();
  const [loanedList, setLoanList] = useState([]);
  const [returnedList, setReturnedList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  const [display, setDisplay] = useState("none");

  function updateCheck(e, index) {
    let newArr = [...checkedItems];
    newArr[index] = e;
    setCheckedItems(newArr);
  }

  function Submit() {
    let i = 0;
    let returnArray = [];
    for (i in checkedItems) {
      if (checkedItems[i]) {
        returnArray.push(loanedList[i].Booking_ID);
      }
    }

    const requestBody = {
      returns: returnArray,
    };
    console.log(requestBody);
    axios.put("http://localhost:3001/return", requestBody).then((response) => {
      if (response.status === 200) {
        toast({
          title: "Successfully returned items",
          description:
            "Please refresh the page to see changes / close this alert",
          status: "success",
          duration: 9000,
          isClosable: true,
          onCloseComplete: () => {
            window.location.reload();
          },
        });
      }
    });
  }

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
        setCheckedItems(new Array(loanedList.length + 1).fill(false));

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
      <Alert status="info" px="39%" py="3%" variant="top-accent">
        <AlertIcon />
        Items still in loan are shown below
      </Alert>
      <br></br>

      <Flex direction="column" color="white" w="100%" px="11%" align>
        <Button colorScheme="teal" onClick={Submit}>
          Submit
        </Button>

        <VStack
          w="100%"
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox
                      size="lg"
                      isChecked={allChecked}
                      isIndeterminate={isIndeterminate}
                      onChange={(e) =>
                        setCheckedItems(
                          new Array(loanedList.length).fill(e.target.checked)
                          // [e.target.checked, e.target.checked, e.target.checked]
                        )
                      }
                    ></Checkbox>
                    {/* <Text display="inline" ml="5%">
                      Return all
                    </Text> */}
                  </Th>
                  <Th>BookingID</Th>
                  <Th>Username</Th>
                  <Th>Item Name</Th>
                  <Th isNumeric>Phone Number</Th>
                  <Th>Date</Th>
                  <Th>Certification</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loanedList.map((data, index) => (
                  <>
                    <Tr>
                      <Td>
                        <Checkbox
                          colorScheme="teal"
                          size="md"
                          value={data.Item_ID}
                          isChecked={checkedItems[index]}
                          onChange={(e) => updateCheck(e.target.checked, index)}
                        ></Checkbox>
                      </Td>
                      <Td>{data.Booking_ID}</Td>
                      <Td>{data.Name}</Td>
                      <Td>{data.Item_Name}</Td>
                      <Td isNumeric>{data.Phone}</Td>
                      <Td>
                        {new Date(data.Datetime).toLocaleDateString(
                          "en-sg",
                          {}
                        )}{" "}
                        {new Date(data.Datetime).toLocaleTimeString(
                          "en-sg",
                          {}
                        )}
                      </Td>
                      <Td>
                        {/* <Tag size="sm" variant="subtle" colorScheme="red">
                          <TagLeftIcon boxSize="12px" />
                          <TagLabel>Not Certified</TagLabel>
                        </Tag> */}
                        {data.Sound || data.Visual === 1 ? (
                          <Tag size="sm" variant="subtle" colorScheme="teal">
                            <TagLeftIcon boxSize="12px" as={CheckIcon} />
                            <TagLabel>Certified</TagLabel>
                          </Tag>
                        ) : (
                          <Tag size="sm" variant="subtle" colorScheme="red">
                            <TagLeftIcon boxSize="12px" as={CloseIcon} />
                            <TagLabel>Not Certified</TagLabel>
                          </Tag>
                        )}
                      </Td>
                    </Tr>

                    {/* <li key={post.ItemID}>{post.Name}</li> */}
                  </>
                ))}
              </Tbody>

              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th>BookingID</Th>
                  <Th>Username</Th>
                  <Th>Item ID</Th>
                  <Th isNumeric>Phone Number</Th>
                  <Th>Date</Th>
                  <Th>Certification</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </VStack>
      </Flex>

      <br></br>
    </>
  );
}

export default Dashboard;
