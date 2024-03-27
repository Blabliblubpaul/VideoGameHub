import { useNavigate } from "react-router-dom"
import Searchbar from "./Header/Searchbar"
import { useDispatch, useSelector } from "react-redux"
import { set } from "../slices/themeSlice"

export default function Header() {
    const navigate = useNavigate()

    return (
        <div id="header">
            <h1>E-Commerce</h1>
            <div className="headermiddle" >
                <Searchbar />
            </div>
            <button className="headerNavButton" onClick={() => navigate("/cart")}><i className="fa fa-shopping-cart"></i></button>
            <CreateThemeButton />
        </div>
    )
}

function CreateThemeButton() {
    const theme = useSelector(state => state.theme.value)
    const dispatch = useDispatch()

    document.body.classList.toggle("dark-mode", theme == "dark")

    if (theme == "light") {
        return <button className="headerNavButton" onClick={() => dispatch(set("dark"))}><i className="fa fa-moon-o"></i></button>
    }
    else {
        return <button className="headerNavButton" onClick={() => dispatch(set("light"))}><i className="fa fa-sun-o"></i></button>
    }
}