class DBWrapper {
    constructor(ip) {
        this.ip = ip;
        console.log("set ip to " + this.ip);
    }

    register(table, amount) {
        fetch("http://" + this.ip + ":5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                table: table,
                amount: amount
            })
        });
    }

    insert(name, score) {
        fetch("http://" + this.ip + ":5000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                score: score
            })
        })
    }

    fetchScores() {
        return fetch("http://" + this.ip + ":5000/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.text())
        .then(responseData => {
            return responseData;
        });
    }
}

async function run() {
    const wrapper = new DBWrapper("kik.danielrauschenberger.de");

    wrapper.register("daniel", 10);

    wrapper.insert("Daniel", 10);

    let penis = await wrapper.fetchScores().then(responseData => responseData);
    console.log(penis);
}