import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Container,
  Box,
  Button,
  setDisplay,
  Center,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";

function ReturnItems() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [display, setDisplay] = useState("none");

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  //   const [Phone,setPhone] = useState(`83636038`);
  const [loanedList, setLoanList] = useState([]);
  const [returnedList, setReturnedList] = useState([]);
  useEffect(() => {
    async function fetchDataList() {
      try {
        const requestUrl = `http://localhost:3001/Booking/83636038`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const inloan = responseJSON.filter((item) => item.returned === 0);

        setLoanList(inloan);
        const returned = responseJSON.filter((item) => item.returned === 1);

        setReturnedList(returned);
        setCheckedItems(new Array(loanedList.length+1).fill(false));
      } catch {
        console.log("failed to fetch data list");
      }
    }
    fetchDataList();
  }, []);

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
        setDisplay("");
        window.location.reload();
      }
    });
  }

  return (
    <>
      <br></br>
      <Center>
        <Alert
          maxW="56%"
          justifyContent="center"
          textAlign="center"
          height="80px"
          status="success"
          variant="top-accent"
          display={display}
        >
          <AlertIcon />
          Item successfully returned
        </Alert>
      </Center>
      <Container centerContent py="5%">
        <Box
          px="2%"
          bg="tomato"
          w="100%"
          borderRadius="lg"
          borderWidth="20px"
          alignContent="center"
        >
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
          >
            Every item returned
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            {loanedList.map((data, index) => (
              
                <Checkbox
                  value={data.Item_ID}
                  isChecked={checkedItems[index]}
                  onChange={(e) => updateCheck(e.target.checked, index)}
                >
                  {data.Item_Name}
                </Checkbox>

            ))}
          </Stack>
          <Button
            size="sm"
            colorScheme="teal"
            onClick={() => {
              Submit();
            }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default ReturnItems;
