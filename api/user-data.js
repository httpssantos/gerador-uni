import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const firebaseConfig = { //Pegue as variáveis do ambiente
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const user = auth.currentUser;

        if (user) {
            // O usuário está logado, você pode enviar os dados para o frontend
            res.status(200).json({
                uid: user.uid,
                email: user.email,
                // ... quaisquer outros dados que você precise
            });
        } else {
            // O usuário não está logado
            res.status(401).json({ error: "Não autenticado" });
        }
    } catch (error) {
        console.error("Erro na API /api/user-data:", error);
        res.status(500).json({ error: "Erro ao obter dados do usuário" });
    }
}
