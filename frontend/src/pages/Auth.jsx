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
import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Auth() {
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
