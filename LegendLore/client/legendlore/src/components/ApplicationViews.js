import { Route, Routes } from "react-router-dom"
import { Hello } from "./Hello"
import { UsersCampaigns } from "./Campaigns/UsersCampaignList"
import { CampaignForm } from "./Campaigns/CampaignForm"

export const ApplicationViews = () => {
    return (
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/my-campaigns" element={<UsersCampaigns />} />
          <Route path="/campaigns/:id" element={<></>} />
          <Route path="/campaigns/add" element={<CampaignForm />} />        
        </Routes>
    )
}