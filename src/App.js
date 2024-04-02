import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import HomePage from "./features/components/Mainbody/Homepage/HomePage"
import Layout from "./features/components/Layout"
import SearchPage from "./features/components/Mainbody/SearchPage"
import GamePage from "./features/components/Mainbody/GamePage/GamePage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Layout}>
            <Route index Component={HomePage}/>
            <Route path="search" Component={SearchPage}/>
            <Route path="inspect" Component={GamePage}/>
        </Route>
      </Routes>
    </Router>
  )
}