// api/salvar-os.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const dados = req.body;

  const { error } = await supabase.from('ordens_servico').insert(dados);

  if (error) {
    return res.status(500).json({ error: 'Erro ao salvar OS', detalhe: error.message });
  }

  return res.status(200).json({ sucesso: true });
}
