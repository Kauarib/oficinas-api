🛠️ Oficinas API

API REST desenvolvida em Node.js para gerenciamento de oficinas mecânicas, permitindo o controle de clientes, veículos e ordens de serviço, com
persistência em MySQL.
O projeto segue uma estrutura organizada inspirada em boas práticas de Clean Code, separando responsabilidades em rotas, controllers e services.

🚀 Tecnologias Utilizadas
Node.js
Express
MySQL
mysql2
dotenv
Nodemon (ambiente de desenvolvimento)

📂 Estrutura do Projeto
oficinas-api/
├── src/
│ ├── controllers/
│ ├── services/
│ ├── routes/
│ ├── db/
│ └── app.js
├── .env.example
├── .gitignore
├── package.json
└── README.md

⚙️ Configuração do Ambiente

1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/oficinas-api.git
cd oficinas-api

2️⃣ Instalar dependências
npm install

3️⃣ Configurar variáveis de ambiente
Crie um arquivo .env baseado no .env.example:
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=oficina
DB_PORT=3306

▶️ Executando o Projeto

npm run dev

API disponível em: http://localhost:3000 

📌 Endpoints Principais

Clientes
POST /clientes
GET /clientes
GET /clientes/:id
PUT /clientes/:id
DELETE /clientes/:id

Veículos
POST /veiculos
GET /veiculos
GET /veiculos/:id
PUT /veiculos/:id
DELETE /veiculos/:id

Ordens de Serviço
POST /ordens-servico
GET /ordens-servico
GET /ordens-servico/:id
GET /ordens-servico/veiculo/:id
PUT /ordens-servico/:id
DELETE /ordens-servico/:id

👨‍💻 Autor
Kauã Ribeiro
Estudante de Engenharia de Software | Backend Developer

📄 Licença
MIT