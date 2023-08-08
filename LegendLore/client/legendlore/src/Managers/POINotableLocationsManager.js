const baseUrl = "/api/POINotableLocations"

export const getAllPOINotableLocationsByPOIId = (id) => {
    return fetch(`${baseUrl}/GetPOINotableLocationsByPOIId/${id}`)
        .then((res) => res.json())
};

export const getPOINotableLocationbyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addPOINotableLocation = (singlePOINotableLocation) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singlePOINotableLocation),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new POINotableLocation")
        }
        return res.json();
    })
};

export const editPOINotableLocation = (singlePOINotableLocation) => {
    return fetch(`${baseUrl}?id=${singlePOINotableLocation.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singlePOINotableLocation)
    });
};

export const deletePOINotableLocation = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};


