import { Route, Routes } from "react-router-dom"
import { Hello } from "./Hello"
import { UsersCampaigns } from "./Campaigns/UsersCampaignList"
import { CampaignForm } from "./Campaigns/CampaignForm"
import { CampaignEdit } from "./Campaigns/CampaignEdit"
import { CampaignMap } from "./Campaigns/CampaignMap"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/my-campaigns" element={<UsersCampaigns />} />
      <Route path="/campaigns/:campaignId/:mapId" element={<CampaignMap />} />
      <Route path="/campaigns/add" element={<CampaignForm />} />
      <Route path="/my-campaigns/edit/:campaignId" element={<CampaignEdit />} />
    </Routes>
  )
}