//import React from "react";

import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, NavBar, SmallSideBar } from "../components";
import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utilits/customFetch";
import { toast } from "react-toastify";
const DashboardContext = createContext();
// check dark theme
export const Loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};
export default function DashboardLayout() {
  const { user } = useLoaderData();
  // console.log("userka weeye", user);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    try {
      await customFetch.get("auth/logout");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.resonse.data.msg);
    }
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}
export const useDashboardContext = () => useContext(DashboardContext);
