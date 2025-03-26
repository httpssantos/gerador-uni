function autoPreencher() {
    const cliente = document.getElementById('cliente').value;
    if (cliente.trim() !== "") {
        fetch("/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cliente })
        })
        .then(response => response.json())
        .then(data => {
            if (data.descricao) {
                document.getElementById('descricao').value = data.descricao;
            } else {
                console.error("Erro ao preencher os campos:", data.error);
            }
        })
        .catch(error => console.error("Erro ao conectar com API:", error));
    }
}
