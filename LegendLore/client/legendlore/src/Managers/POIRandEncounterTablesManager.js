const baseUrl = "/api/POIRandEncounterTables"

export const getAllPOIRandEncounterTablesByPOIId = (id) => {
    return fetch(`${baseUrl}/GetPOIRandEncounterTablesByPOIId/${id}`)
        .then((res) => res.json())
};

export const getPOIRandEncounterTablebyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addPOIRandEncounterTable = (singlePOIRandEncounterTable) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singlePOIRandEncounterTable),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new POIRandEncounterTable")
        }
        return res.json();
    })
};

export const editPOIRandEncounterTable = (singlePOIRandEncounterTable) => {
    return fetch(`${baseUrl}?id=${singlePOIRandEncounterTable.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singlePOIRandEncounterTable)
    });
};

export const deletePOIRandEncounterTable = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};
