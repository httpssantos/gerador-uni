import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Inicialização do Firebase *removida* daqui

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { email, password } = req.body;

    try {
        // Obtenha as credenciais do Firebase *do ambiente*
        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
        };

        // Inicialize o Firebase *dentro* da função handler, usando as credenciais do ambiente
        const { initializeApp } = await import("firebase/app"); // Import dinâmico
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return res.status(200).json({ user: userCredential.user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
