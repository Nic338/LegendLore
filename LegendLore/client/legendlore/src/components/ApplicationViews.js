import { Route, Routes } from "react-router-dom"
import { Hello } from "./Hello"
import { UsersCampaigns } from "./Campaigns/UsersCampaignList"

export const ApplicationViews = () => {
    return (
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/my-campaigns" element={<UsersCampaigns />} />
          <Route path="/campaigns/:id" element={<></>} />        
        </Routes>
    )
}