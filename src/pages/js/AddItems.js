import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Stack,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

function AddItems() {
  const [itemname, setItemname] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  function submit() {
    const requestBody = {
      ItemName: itemname,
      Category: category,
      Description: description,
    };
    console.log(requestBody);
    axios
      .post("http://localhost:3001/CreateItem ", requestBody)
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
          {" "}
          Add Items to Database
        </Text>
        <FormControl isRequired>
          <InputGroup>
            <Input
              placeholder="Item Name"
              onChange={(e) => setItemname(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <Input
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <Input
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <Button onClick={submit} colorScheme="red" _hover={{ boxShadow: "lg" }}>
          submit
        </Button>
      </Stack>
    </form>
  );
}

export default AddItems;
