const baseUrl = "/api/RandomEncountersTable"

export const getAllRandomEncountersTables = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getRandomEncountersTablebyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addRandomEncountersTable = (singleRandomEncountersTable) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleRandomEncountersTable),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new RandomEncountersTable")
        }
        return res.json();
    })
    .then((data) => {
        return data.id;
    });
};

export const editMapRandomEncountersTable = (singleRandomEncountersTable) => {
    return fetch(`${baseUrl}?id=${singleRandomEncountersTable.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleRandomEncountersTable)
    });
};

export const deleteRandomEncountersTable = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};