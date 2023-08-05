const baseUrl = "/api/NotableLocation"

export const getAllNotableLocations = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getNotableLocationbyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addNotableLocation = (singleNotableLocation) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleNotableLocation),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new Notable Location")
        }
        return res.json();
    })
    .then((data) => {
        return data.id;
    });
};

export const editNotableLocation = (singleNotableLocation) => {
    return fetch(`${baseUrl}?id=${singleNotableLocation.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleNotableLocation)
    });
};

export const deleteNotableLocation = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};