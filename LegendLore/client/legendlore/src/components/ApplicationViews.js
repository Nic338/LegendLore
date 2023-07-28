import { Route, Routes } from "react-router-dom"
import { Hello } from "./Hello"

export const ApplicationViews = () => {
    return (
        <Routes>
          <Route path="/" element={<Hello />} />  
        </Routes>
    )
}