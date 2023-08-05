const baseUrl = "/api/Quest"

export const getAllQuests = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getQuestbyId = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addQuest = (singleQuest) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleQuest),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new Quest")
        }
        return res.json();
    })
    .then((data) => {
        return data.id;
    });
};

export const editMapQuest = (singleQuest) => {
    return fetch(`${baseUrl}?id=${singleQuest.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleQuest)
    });
};

export const deleteQuest = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
};