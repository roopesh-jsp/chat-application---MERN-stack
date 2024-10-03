import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { ChakraBaseProvider, ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "./store/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/auth",
        element: <Auth />,
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
