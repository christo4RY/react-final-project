import { Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../pages/App";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import Dashboard from "../pages/Dashboard";
import RouteGuard from "../components/RouteGuard";
import Index from "../pages/Contacts/Index";
import Show from "../pages/Contacts/Show";
import Edit from "../pages/Contacts/Edit";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<App/>}>
                <Route index element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
            </Route>
            <Route path="/dashboard" element={<RouteGuard>
                <Dashboard/>
            </RouteGuard>}>
                <Route index element={<Index/>}/>
                <Route path="contact/:id" element={<Show/>}/>
                <Route path="edit/:id" element={<Edit/>}/>
            </Route>
        </Route>
    )
)