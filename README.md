# ByteGames - Dashboards Online

Projeto completo para um painel interativo de eSports com:

* Conversão de pontos com lógica personalizada
* API mockada em JSON local
* CI/CD com GitHub Actions
* Monitoramento com Prometheus + Grafana + Loki
* Deploy Contínuo via Firebase Hosting

---

## 📂 Estrutura de Branches

```mermaid
gitGraph
   commit id: "v1.0" tag: "main"
   branch dev
   commit id: "Commit inicial na dev"
   branch feature/tela-login
   commit id: "Início tela de login"
   commit id: "Finaliza layout login"
   checkout dev
   merge feature/tela-login tag: "Merge PR #1"
   branch feature/menu
   commit id: "Adiciona menu lateral"
   checkout dev
   merge feature/menu tag: "Merge PR #2"
   checkout main
   merge dev tag: "Release v1.1"
🔀 Branches Utilizadas
Branch	Finalidade
main	Código de produção (estável)
dev	Integração de todas as funcionalidades
feature/*	Desenvolvimento de novas funcionalidades
bugfix/*	Correções de bugs encontrados na dev
hotfix/*	Correções urgentes diretamente em main

✅ Boas Práticas
📌 Criação de branch
bash
Copy
Edit
git checkout dev
git pull origin dev
git checkout -b feature/nome-funcionalidade
✏️ Commits claros e atômicos
bash
Copy
Edit
git add .
git commit -m "Adiciona botão de login"
🔁 Rebase antes do PR
bash
Copy
Edit
git fetch origin
git rebase origin/dev
⬆️ Merge com dev
Abra um Pull Request no GitHub da sua branch feature/* para a dev.

🚀 Merge para produção (main)
bash
Copy
Edit
git checkout main
git pull origin main
git merge --no-ff dev
git push origin main
🏷️ Criar Tag de Versão
bash
Copy
Edit
git tag -a v1.1.0 -m "Release 1.1.0"
git push origin v1.1.0
🔒 Proteção de Branches (GitHub)
Regras recomendadas:

✅ Proteger branches main e dev

✅ Bloquear commits diretos nessas branches

✅ Requerer Pull Requests com revisão

✅ Bloquear force push

📈 Visualização do Histórico
bash
Copy
Edit
git log --oneline --graph --all

---

🧩 Explicação das principais partes
🔁 on: push
Dispara o workflow automaticamente quando um push é feito na branch dev. Você pode ajustar para outras branches:

yaml
Copy
Edit
on:
  push:
    branches: [main, dev]
⚙️ jobs e runs-on
Define o trabalho (job) a ser executado. runs-on: ubuntu-latest cria um ambiente Linux temporário onde o projeto será testado.

📦 steps
Sequência de ações no job.

1. Checkout do repositório:

Usa a ação oficial actions/checkout@v4 para baixar os arquivos do repositório.

2. Setup do Node.js:

Usa a ação actions/setup-node@v4 para instalar a versão correta do Node.

Você pode configurar outras opções como cache de dependências, se quiser.

3. Instalação de dependências:

Executa npm install para baixar todas as bibliotecas declaradas no package.json.

4. Execução dos testes:

Executa npm test, que normalmente roda scripts definidos no package.json, como:

json
Copy
Edit
"scripts": {
  "test": "jest"
}

---

🧩 O que esse teste cobre?
Teste	Garante que:
Cálculo correto	A taxa está certa mesmo após refatorações
Divisão por zero	Não ocorre erro nem resultado inválido
Entradas inválidas	Erros são tratados (robustez)
Tipos errados	Não quebra o app silenciosamente
Precisão decimal	Resultado tem formato consistente

🔁 Como isso ajuda no CI/CD?
Ao incluir esse teste no repositório:

GitHub Actions executará npm test a cada push ou pull request.

Se houver regressões (como recentemente), o build falhará automaticamente.

Isso evita deploys com bugs na taxa de vitórias dos jogadores — crítico para dashboards e estatísticas no jogo.

Exemplo no workflow .yml:
yaml
Copy
Edit
- name: Run Tests
  run: npm test
🚀 Conclusão
Testes como esse aumentam a confiabilidade do sistema, evitam erros em produção, e permitem que a ByteGames entregue atualizações com segurança, mesmo em um time indie pequeno.

---

✅ 1. Escrevendo logs personalizados com console
O Firebase (via Cloud Functions ou Hosting com Cloud Logging ativado) captura logs enviados via:

console.log – para eventos informativos

console.warn – para avisos

console.error – para erros e falhas

🎯 Exemplo: Log de evento de login bem-sucedido
js
Copy
Edit
console.log('[LOGIN_SUCESSO] Usuário ID: 123 logado com sucesso.');
⚠️ Exemplo: Falha no login
js
Copy
Edit
console.error('[LOGIN_FALHA] Email inválido ou senha incorreta. Usuário: user@example.com');
📡 Exemplo: Requisição HTTP com status
js
Copy
Edit
console.log(`[HTTP] GET /perfil - Status: 200 - Usuário ID: 456`);
console.error(`[HTTP] POST /pontuacao - Status: 500 - Erro interno ao salvar dados`);

✅ 2. Acessando os logs no Firebase Console
▶️ Caminho:
Vá para https://console.firebase.google.com/

Selecione seu projeto (ex: bytegames-web)

No menu lateral, vá até:
Build > Functions ou Monitoring > Logs

Clique em "Ver em Cloud Logging" (Stackdriver Logs)

✅ 3. Filtrando logs para identificar erros
No Cloud Logging, use filtros para:

Ver apenas logs de erro:

txt
Copy
Edit
severity="ERROR"
Ver logs com palavra-chave personalizada:

txt
Copy
Edit
textPayload: "LOGIN_FALHA"
Ver logs de uma URL específica:

txt
Copy
Edit
textPayload: "/pontuacao"

✅ 4. Boas práticas de logging
Boas Práticas	Exemplo
✅ Use prefixos identificáveis	[LOGIN_SUCESSO], [HTTP], [ERRO_DB]
✅ Inclua IDs e contexto do usuário	Usuário ID: 789, Email: user@x.com
✅ Evite logs excessivos de debug	Remova console.log desnecessários em produção
✅ Classifique logs por severidade	Use console.log (info), console.warn (aviso), console.error (erro)
✅ Padronize a estrutura	[TIPO] Mensagem - Contexto - StatusCode

✅ 5. Exemplo completo em um endpoint Firebase Function
js
Copy
Edit
exports.loginUser = functions.https.onRequest(async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await autenticar(email, senha);

    console.log(`[LOGIN_SUCESSO] Usuário ID: ${user.id} logado.`);

    res.status(200).send({ mensagem: "Login realizado" });
  } catch (erro) {
    console.error(`[LOGIN_FALHA] Email: ${email} - Erro: ${erro.message}`);

    res.status(401).send({ erro: "Credenciais inválidas" });
  }
});

🧠 Benefícios para ByteGames
Monitoramento em tempo real de bugs

Histórico de erros por usuário, endpoint ou módulo

Suporte facilitado para debugging e atendimento

Base para futuros alertas automáticos (ex: Firebase Alerting ou Stackdriver)

---

✅ 1. Inicializando o Firebase Hosting localmente
No terminal:

bash
Copy
Edit
firebase login
firebase init hosting
Durante a inicialização:

Selecione o projeto Firebase existente (ou crie um novo)

Escolha o diretório de build do seu front-end (ex: dist/ ou build/)

Responda "Sim" para configurar como SPA (caso use React, Vue, etc.)

Evite sobrescrever index.html se já tiver o seu

Resultado: o comando cria dois arquivos essenciais
firebase.json – configura as regras e comportamento do Hosting

.firebaserc – define qual projeto Firebase está vinculado

✅ 2. Exemplo de firebase.json
json
Copy
Edit
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
✅ 3. Teste local (opcional)
Antes de publicar:

bash
Copy
Edit
firebase serve
✅ 4. Deploy manual inicial
bash
Copy
Edit
firebase deploy
Verifique se está tudo certo no navegador:
https://<nome-do-projeto>.web.app

✅ 5. Configurando Deploy Automático via GitHub Actions
🔐 A. Gerar token de acesso do Firebase CLI
No terminal:

bash
Copy
Edit
firebase login:ci
Isso vai gerar um token como:

cpp
Copy
Edit
1//0gHxxxxxxxxxx...
🔐 B. Adicionar token como secret no GitHub
No GitHub:

Vá até o repositório > Settings > Secrets and variables > Actions

Clique em New secret

Nome: FIREBASE_TOKEN

Valor: cole o token gerado 

✅ 6. Criar workflow GitHub Actions
Crie o arquivo .github/workflows/firebase-hosting.yml 

🔁 7. Rollback (desfazer deploy)
Se o deploy falhar ou quebrar algo em produção:

A. Identificar versões anteriores:
No Firebase Console > Hosting > clique em “Ver histórico de versões”

B. Restaurar:
Escolha uma versão e clique em “Restaurar esta versão”

🧠 Boas práticas de publicação
Prática	Por quê
🔄 CI com main/dev separados	Evita publicar código inacabado
📦 Build limpo antes do deploy	Garante que arquivos obsoletos não sejam publicados
🚨 Rollback habilitado	Restauração rápida em caso de falhas
🔐 Segredos no GitHub	Segurança com tokens de acesso
✅ Testar localmente com firebase serve	Valida o build antes de publicar
📂 Ignorar arquivos sensíveis	Evitar publicação de .env, node_modules, etc.

✅ Resumo do fluxo
bash
Copy
Edit
firebase login          # uma vez
firebase init hosting   # uma vez
firebase deploy         # para testar manualmente
# Depois, o GitHub Actions cuida do resto em cada push!

---

