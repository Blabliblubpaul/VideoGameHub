import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <div id="container">
            <Header />
            <div id="mainbody">
                <Outlet />
            </div>
        </div>
    )
}