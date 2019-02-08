function insert(ip, table, name, score) {
    fetch("http://" + ip + ":5000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            table: table,
            name: name,
            score: score
        })
    });
}

function getHighScores(ip, table, amount) {
    return fetch("http://" + ip + ":5000/", {
            method: "POST",
            body: {
                table: table,
                amount,
                amount
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.text())
        .then(responseData => {
            return responseData;
        });
}


async function run() {
    insert("kik.danielrauschenberger.de", "daniel", "Daniel", 10);

    let penis = await wrapper.getHighScores("kik.danielrauschenberger.de", "daniel", 10).then(responseData => responseData);
    console.log(penis);
}