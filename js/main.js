const endpoint = "https://ueunyizn20.execute-api.us-east-2.amazonaws.com/sets";

// id, set name, set words

const searchAllSets = async () => {
    let headers = {
        method: "GET"
    };
    const response = await fetch(`${endpoint}`, headers);
    if (!response.ok) {
        console.error("Server responded with " + response.status);
        return;
    }
    const json = response.json();
    console.log(json);
    return json;
}

const getSet = async (id) => {
    let headers = {
        method: "GET",
    };
    const response = await fetch(`${endpoint}/${id}`, headers);
    if (!response.ok) {
        console.error("Server responed with " + response.status);
        return;
    }
    const json = response.json();
    console.log(json);
    return json;
}

const filterData = (json, filters) => {

}

const createSet = async (name, words) => {
    let headers = {
        method: "PUT",
        body: JSON.stringify({
            id: 298523,
            name: name,
            words: words
        })
    };
    const response = await fetch(`${endpoint}`, headers);
    if (!response.ok) {
        console.error("Server responded with " + response.status);
        return;
    }
    const json = response.json();
    console.log(json);
    return json;
}

const deleteSet = async (id) => {
    let headers = {
        method: "DELETE"
    };
    const response = await fetch(`${endpoint}/${id}`, headers);
    if (!response.ok) {
        console.error("Server responded with " + response.status);
        return;
    }
    const json = response.json();
    console.log(json);
    return json;
}