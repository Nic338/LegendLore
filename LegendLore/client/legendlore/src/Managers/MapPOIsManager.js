const baseUrl = "/api/MapPOIs"

export const getAllMapPOIsByMapId = (id) => {
    return fetch(`${baseUrl}/GetMapPOIsByMapId/${id}`)
        .then((res) => res.json())
};

export const getMapPOIbyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addMapPOI = (singleMapPOI) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleMapPOI),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new POI")
        }
        return res.json();
    })
};

export const editMapPOI = (singleMapPOI) => {
    return fetch(`${baseUrl}?id=${singleMapPOI.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleMapPOI)
    });
};

export const deleteMapPOI = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};


