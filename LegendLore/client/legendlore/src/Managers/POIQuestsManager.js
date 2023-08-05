const baseUrl = "/api/POIQuests"

export const getAllPOIQuestsByPOIId = (id) => {
    return fetch(`${baseUrl}/GetPOIQuestsByPOIId/${id}`)
        .then((res) => res.json())
};

export const getPOIQuestbyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addPOIQuest = (singlePOIQuest) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singlePOIQuest),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new POIQuest")
        }
        return res.json();
    })
};

export const editPOIQuest = (singlePOIQuest) => {
    return fetch(`${baseUrl}?id=${singlePOIQuest.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singlePOIQuest)
    });
};

export const deletePOIQuest = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};
