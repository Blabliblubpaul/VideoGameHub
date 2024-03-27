import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import HomePage from "./features/components/Mainbody/HomePage"
import Layout from "./features/components/Layout"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Layout}>
            <Route index element={HomePage}/>
        </Route>
      </Routes>
    </Router>
  )
}