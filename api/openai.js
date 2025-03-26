const { Configuration, OpenAIApi } = require("openai");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { cliente } = req.body;
    if (!cliente) {
        return res.status(400).json({ error: "Cliente não informado" });
    }

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY // Defina no ambiente do Vercel
    });
    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Gere uma descrição para o cliente: ${cliente}` }],
        });

        return res.status(200).json({ descricao: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Erro ao conectar com OpenAI:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Erro ao conectar com OpenAI", detalhes: error.message });
    }
};
