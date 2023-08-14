import { Route, Routes } from "react-router-dom"
import { Hello } from "./Hello"
import { UsersCampaigns } from "./Campaigns/UsersCampaignList"
import { CampaignForm } from "./Campaigns/CampaignForm"
import { CampaignEdit } from "./Campaigns/CampaignEdit"
import { CampaignMap } from "./Campaigns/CampaignMap"
import { POIDetails } from "./POIs/POIDetails"
import { AdditionalMapForm } from "./Campaigns/AdditionalMapForm"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/my-campaigns" element={<UsersCampaigns />} />
      <Route path="/campaigns/:campaignId/:mapId" element={<CampaignMap />} />
      <Route path="/campaigns/add" element={<CampaignForm />} />
      <Route path="/my-campaigns/edit/:campaignId" element={<CampaignEdit />} />
      <Route path="/poi/:id" element={<POIDetails />} />
      <Route path="/my-campaigns/:campaignId/new-map" element={<AdditionalMapForm />} />
    </Routes>
  )
}