import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Stack,
  InputGroup,
  InputLeftElement,
  Divider,
  Alert,
  AlertIcon,
  Center,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

function AddItems() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [Congregation, setCongregation] = useState("");
  const [checkedItems, setCheckedItems] = useState([false, false]);
  function submit() {
    const requestBody = {
      username: name,
      Phone: phone,
      congregation: Congregation,
      Visual: Number(checkedItems[0]),
      Sound: Number(checkedItems[1]),
    };
    console.log(requestBody);
    axios
      .post("http://localhost:3001/AddCertified ", requestBody)
      .then((response) => {
        if (response.status === 200) {
          alert("yay");
        }
      });
  }

  return (
    <form>
      <Stack spacing={3} width="100%" px="22%">
        <Text justifyContent="center" fontSize="3xl">
          Add Certified Users to Database
        </Text>
        <FormControl isRequired>
          <InputGroup>
            <Input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <Input
              placeholder="Congregation"
              onChange={(e) => setCongregation(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <Checkbox
            m="10px"
            size="lg"
            isChecked={checkedItems[0]}
            onChange={(e) =>
              setCheckedItems([e.target.checked, checkedItems[1]])
            }
          >
            Visual
          </Checkbox>
          <Checkbox
            m="10px"
            size="lg"
            isChecked={checkedItems[1]}
            onChange={(e) =>
              setCheckedItems([checkedItems[0], e.target.checked])
            }
          >
            Sound
          </Checkbox>
        </FormControl>
        <Button onClick={submit} colorScheme="red" _hover={{ boxShadow: "lg" }}>
          submit
        </Button>
      </Stack>
    </form>
  );
}

export default AddItems;
