const endpoint = "https://sfar5pofke.execute-api.us-east-2.amazonaws.com/sets";

// Returns the entire list of sets if found on the server
const searchAllSets = async () => {
    let headers = {
        method: "GET"
    };
    const response = await fetch(`${endpoint}`, headers);
    if (!response.ok) {
        console.error("Server responded with " + response.status);
        console.error(response);
        return;
    }
    const json = await response.json();
    console.log(json);
    return json;
}

// Gets a set by its ID (goes unused in the actual site)
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

// Filters a list of sets using the filters object it is given
// The filters object should have either a name or words field, and any
// set that contains either part of the name or part of the words text is kept
const filterData = (json, filters) => {
    console.log(filters);
    if (filters.name) {
        json = json.filter(value => value.name.includes(filters.name));
    }
    if (filters.words) {
        json = json.filter(value => {
            //console.log(value.words.includes(filters.words));
            return value.words.includes(filters.words);
        });
    }
    if (filters.sort === 'name') {
        if (filters.descending) {
            json.sort((a, b) => a.name < b.name);
        }
        else {
            json.sort((a, b) => a.name > b.name);
        }
    }
    else if (filters.sort === 'words') {
        if (filters.descending) {
            json.sort((a, b) => a.words < b.words);
        }
        else {
            json.sort((a, b) => a.words > b.words);
        }
    }
    return json;
}

// Creates a new set given the name and a string containing the words
const createSet = async (name, words) => {
    let headers = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: "" + (Math.random() * 1000000000),
            name: name,
            words: words
        })
    };
    const response = await fetch(`${endpoint}`, headers);
    if (!response.ok) {
        console.error("Server responded with " + response.status);
        return;
    }
    const json = await response.json();
    console.log(json);
    return json;
}

// Deletes a given set
const deleteSet = async (id) => {
    let headers = {
        method: "DELETE"
    };
    const response = await fetch(`${endpoint}/${id}`, headers);
    if (!response.ok) {
        console.error("Server responded with " + response.status);
        return;
    }
    const json = await response.json();
    console.log(json);
    return json;
}