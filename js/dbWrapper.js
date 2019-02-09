function insert(ip, table, name, score) {
    fetch("http://" + ip + "/setHighscore", {
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

function getHighScores(ip, table, limit) {
    return fetch("http://" + ip + "/getHighscores", {
            method: "POST",
            body: JSON.stringify({
                table: table,
                limit: limit,
            }),
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

    let penis = await getHighScores("kik.danielrauschenberger.de", "daniel", 10).then(responseData => responseData);
    console.log(JSON.parse(penis));
}
