export default (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("IP do visitante:", ip); // Registra no log do Vercel
  
  // Para retornar o IP no front-end (opcional):
  res.status(200).json({ ip });
};
