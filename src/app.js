import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import clientesRoutes from './routes/clientesRoutes.js';
import veiculosRoutes from './routes/veiculosRoutes.js';
import osRoutes from './routes/osRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/clientes', clientesRoutes);
app.use('/veiculos', veiculosRoutes);
app.use('/ordens-servico', osRoutes);
app.use('/auth', authRoutes);

export default app;

console.log('DB CONFIG =>', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
