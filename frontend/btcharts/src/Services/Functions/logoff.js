import UrlApi from "../apiService"

const logoff = {
    efetuarLogoff() {
        let bodyCriado = {
            jsonrpc: "2.0",
            method: "user.logout",
            params: [],
            id: 1,
            auth: localStorage.getItem("usuario-blocktime")
        }
        fetch(UrlApi, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyCriado),
        }
        )
            .then(response => response.json())
            .then(data => {
                if (data.result === true) {
                    localStorage.removeItem("usuario-blocktime")
                    console.log(data)
                }
            })
            .catch(erro => console.log(erro))
    }
}

export default logoff