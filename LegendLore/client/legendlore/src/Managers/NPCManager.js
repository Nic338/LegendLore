const baseUrl = "/api/NPC"

export const getAllNPCs = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getNPCbyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addNPC = (singleNPC) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleNPC),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new NPC")
        }
        return res.json();
    })
    .then((data) => {
        return data.id;
    });
};

export const editNPC = (singleNPC) => {
    return fetch(`${baseUrl}?id=${singleNPC.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleNPC)
    });
};

export const deleteNPC = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};