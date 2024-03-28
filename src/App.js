import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import HomePage from "./features/components/Mainbody/HomePage"
import Layout from "./features/components/Layout"
import SearchPage from "./features/components/Mainbody/SearchPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Layout}>
            <Route index Component={HomePage}/>
            <Route path="search" Component={SearchPage}/>
        </Route>
      </Routes>
    </Router>
  )
}