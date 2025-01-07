import React from "react";
import Login from "./components/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatProvider from "./context/ChatProvider";
import RootLaout from "./pages/RootLaout";
import Home from "./pages/Home";
import AppProvider from "./context/AppProvider";
import Protector from "./wrappers/Protector.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLaout />,
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
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
function App() {
  return (
    <AppProvider>
      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
    </AppProvider>
  );
}

export default App;
