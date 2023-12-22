import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlannerState } from './Store';
import RootLayout from './components/RootLayout/RootLayout';
import Main from "./components/Main/Main";
import UserBoard from './components/UserBoard/UserBoard';
import PlanTaskboard from './components/PlanTaskboard/PlanTaskboard';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Notification from './components/Notification/Notification';
import Classes from './App.module.css';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import { getAllPlans } from './slices/plan-slice';
import { usePlannerDispatch } from './Store';

const App: React.FC = () => {

  const appRef = useRef<HTMLDivElement>(null);

  const dispatch = usePlannerDispatch();

  const notification = useSelector((state: PlannerState) => state.notification);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const RoutesArr: RouteObject[] = [
    {path: "planhub", element: <Main />},
    {path: "userboard", element: <UserBoard />},
    {path: "planboard/:id", element: <PlanTaskboard />}
  ];

  const router = createBrowserRouter([
    { path: "signin", element: <Login />},
    { path: "signup", element: <Signup />},
    { path: "/", element: <RootLayout />, children: RoutesArr}
  ]);

  return (
    <>
      <div ref={appRef} className={Classes.App}>
        <RouterProvider router={router} />
        {notification.isNotification &&  <Notification />}
      </div>
    </>
  );
}

export default App;