import {
  Box,
  Container,
  TabList,
  Tabs,
  Text,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { AuthContext } from "../store/authContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  if (token) {
    navigate("/");
  }
  return (
    <div className="auth_page">
      <Box className="auth_page_title">
        <Text>Authentication</Text>
      </Box>
      <Box className="auth_page_body">
        <Tabs className="tabs" variant="soft-rounded">
          <TabList className="tablist">
            <Tab className="tab">Login</Tab> <Tab className="tab">signUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}
