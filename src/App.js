import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/js/Login";
import Dashboard from "./pages/js/Dashboard";
import Nav from "./components/js/Nav.tsx";
import NotFound from "./pages/js/NotFound";
import Loan from "./pages/js/Loan.js";
import Return from "./pages/js/return.js";
import Returned from "./pages/js/Item_Returned";
import AddItems from "./pages/js/AddItems";
import AddCertified from "./pages/js/AddCertified";

import { ChakraProvider ,extendTheme} from '@chakra-ui/react'
import {  MultiSelectTheme } from 'chakra-multiselect'


const App = () => {
  const themes = extendTheme({
    components: {
      MultiSelect: MultiSelectTheme
    }
  })
  return (

    <ChakraProvider theme={themes}>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={ <><Nav/><Login /></>} />
    <Route path="/loan" element={ <><Nav/><Loan /></>} />
    <Route path="/dashboard" element={<> <Nav/> <Dashboard/></>} />
    <Route path="/return" element={<> <Nav/><Return/> </>} />
    <Route path="/ItemsReturned" element={<> <Nav/><Returned/> </>} />
    <Route path="/AddItems" element={<> <Nav/><AddItems/> </>} />
    <Route path="/AddCertified" element={<> <Nav/><AddCertified/> </>} />
    <Route path="*" element={<><Nav/><NotFound /></>} />
    </Routes>
      
    </BrowserRouter>
    </ChakraProvider>


  
  );
}

export default App;