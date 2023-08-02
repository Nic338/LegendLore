const baseUrl = "/api/Map";

export const getMapsByCampaign = (id) => {
    return fetch(`${baseUrl}/GetMapsByCampaign?id=${id}`)
        .then((res) => res.json())
};

export const getMapById = (id) => {
    return fetch(`${baseUrl}?id=${id}`)
        .then((res) => res.json())
};

export const addMap = (singleMap) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleMap)
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

export const editMap = (map) => {
    return fetch(`${baseUrl}?id=${map.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(map)
    });
};

export const uploadMapImage = (mapImage, width, height) => {
    const formData = new FormData();
    formData.append("image", mapImage)
    formData.append("width", width)
    formData.append("height", height)
    return fetch(`${baseUrl}/upload-map-image`, {
        method: "POST",
        body: formData,
    })
};

export const deleteMap = (campaignId) => {
    return fetch(`${baseUrl}/${campaignId}`, {
        method: "DELETE",
    })
};