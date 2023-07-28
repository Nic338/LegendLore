const baseUrl = "/api/Campaigns";

export const getAllCampaigns = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getAllUsersCampaigns = (id) => {
    return fetch(`${baseUrl}/GetUsersCampaigns/${id}`)
        .then((res) => res.json())
};

export const getCampaignById = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addCampaign = (singleCampaign) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleCampaign),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to create new Campaign")
            }
            return res.json();
        })
        .then((data) => {
            return data.id;
        });
};

export const editCampaign = (campaign) => {
    return fetch(`${baseUrl}/${campaign.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(campaign)
    });
};

export const deleteCampaign = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};

export const uploadMapImage = (mapImage) => {
    const formData = new FormData();
    formData.append("image", mapImage)
    return fetch(`${baseUrl}/upload-image`, {
        method: "POST",
        body: formData,
    })
};