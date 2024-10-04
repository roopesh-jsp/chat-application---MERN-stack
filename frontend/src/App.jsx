import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "./store/authContext";
import Protector from "./pages/Protector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <Protector>
            <Home />
          </Protector>
        ),
      },
      {
        path: "/auth",
        element: (
          <Protector>
            <Auth />
          </Protector>
        ),
      },
    ],
  },
]);
export default function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ChakraProvider>
  );
}
