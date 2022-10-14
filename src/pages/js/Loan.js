import React from "react";
import {
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  Divider,
  Alert,
  AlertIcon,
  Center
} from "@chakra-ui/react";
import { PhoneIcon, Icon } from "@chakra-ui/icons";
import { MultiSelect } from "chakra-multiselect";
import { useState, useEffect } from "react";
import axios from "axios";
// import CompExample from "../../components/js/alert";

function Loan() {
  const [display, setDisplay] = useState("none");
  const [dataList, setDataList] = useState([]);
  const [idList, setIdList] = useState([]);
  const [str, setStr] = useState("");
  const [nameList, setNameList] = useState([]);
  const [value, setValue] = useState([]);
  const [phone, setPhone] = useState(0);
  const [name, setName] = useState("");
  //   const [options, setOptions] = useState([]);
  useEffect(() => {
    async function fetchDataList() {
      try {
        const requestUrl = "http://localhost:3001/Item";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setDataList(responseJSON);
        setNameList(responseJSON.map((item) => item.Name));
        console.log(nameList)
        // console.log(responseJSON);
      } catch {
        console.log("failed to fetch data list");
      }
    }
    fetchDataList();
  }, []);

  function submit() {
    const selectedItems = dataList
      .filter((item) => value.includes(item.Name))
      .map((item) => item.item_ID)
      .join(",");

    // setStr(idList.map(Number).toString());

    // console.log(str)
    const requestBody = {
      Name: name,
      Phone: phone,
      ItemID: selectedItems,
    };
    console.log(requestBody);
    axios
      .post("http://localhost:3001/booking", requestBody)
      .then((response) => {
        if (response.status === 200) {
          setDisplay("");
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
          Thank you {name} for booking ! Kindly notify the duty officer when you
          return the item.
        </Alert>
      </Center>

      <br></br>

      <form>
        <Stack spacing={3} width="100%" px="22%">
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<Icon name="info" />} />
              <Input
                type="name"
                placeholder="Name"
                aria-label="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<PhoneIcon name="PhoneIcon" />} />
              <Input
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Divider />

          <MultiSelect
            options={nameList}
            value={value}
            label="Choose an item"
            onChange={setValue}
          />

          <Button
            onClick={submit}
            colorScheme="red"
            _hover={{ boxShadow: "lg" }}
          >
            submit
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default Loan;
