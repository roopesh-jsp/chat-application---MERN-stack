import React from "react";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatProvider from "./context/ChatProvider";
import RootLaout from "./pages/RootLaout";
import Home from "./pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLaout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
function App() {
  return (
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  );
}

export default App;
