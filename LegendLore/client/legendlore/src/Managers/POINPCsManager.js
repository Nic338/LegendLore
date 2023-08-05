const baseUrl = "/api/POINPCs"

export const getAllPOINPCsByPOIId = (id) => {
    return fetch(`${baseUrl}/GetPOINPCsByPOIId/${id}`)
        .then((res) => res.json())
};

export const getPOINPCbyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addPOINPC = (singlePOINPC) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singlePOINPC),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new POINPC")
        }
        return res.json();
    })
};

export const editPOINPC = (singlePOINPC) => {
    return fetch(`${baseUrl}?id=${singlePOINPC.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singlePOINPC)
    });
};

export const deletePOINPC = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};
