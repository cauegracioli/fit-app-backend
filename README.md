Este é um projeto base que utiliza o NodeJS, TypeScript, MongoDB, Prisma e Express. O objetivo desse projeto é fornecer uma base para desenvolvimento de aplicações web.

## Requisitos
- NodeJS >= 14.x
= MongoDB >= 4.x

## Instalação
- Faça um clone deste repositório.
- Execute o comando npm install para instalar as dependências.
- Renomeie o arquivo .env.example para .env.
- Configure as variáveis de ambiente no arquivo .env.
- Execute o comando npm run dev para iniciar o servidor.

## Configuração
- As configurações de banco de dados estão em src/config/database.ts.
- As configurações de servidor estão em src/config/server.ts.

## Utilização
- O arquivo src/index.ts é o ponto de entrada da aplicação.
- Os endpoints estão em src/routes/.
- Os schemas do banco de dados estão em src/prisma/schema.prisma.
- Os models do banco de dados são gerados automaticamente com o comando npm run generate.
- As funções de acesso ao banco de dados estão em src/repository/.

## Comandos
- npm run dev: Inicia o servidor em modo de desenvolvimento.
- npm run build: Compila o código TypeScript em JavaScript.
- npm run start: Inicia o servidor em modo de produção.
- npm run generate: Gera os modelos do banco de dados a partir do arquivo src/prisma/schema.prisma.
- npm run prisma:studio: Inicia o Prisma Studio para gerenciamento do banco de dados.

## Contribuição
Contribuições são bem-vindas. Sinta-se à vontade para abrir uma issue ou pull request.#