const baseUrl = "/api/POI"

export const getAllPOIs = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getPOIbyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addPOI = (singlePOI) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singlePOI),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new POI")
        }
        return res.json();
    })
    .then((data) => {
        return data.id;
    });
};

export const editPOI = (singlePOI) => {
    return fetch(`${baseUrl}?id=${singlePOI.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singlePOI)
    });
};

export const deletePOI = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};