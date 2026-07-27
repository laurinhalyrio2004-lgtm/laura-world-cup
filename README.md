# 🏆 Laura World Cup — Chapter 22

Sistema oficial de convites e gestão do **Laura World Cup**, um campeonato de
gincanas entre amigos para o aniversário de 22 anos da Laura.

> "World Cup" aqui não representa futebol nem a FIFA — é o nome do
> campeonato de gincanas. Nenhum elemento visual ou de identidade da FIFA é
> utilizado neste projeto.

`#LauraFaz22` `#Chapter22` `#LauraWorldCup`

---

## O que este projeto entrega

Um produto digital completo, não um simples convite:

- **Central de Comando** — painel administrativo protegido por senha, só o
  organizador acessa.
- **Convites individuais** — cada convidado tem uma URL própria
  (`/convite/joao-silva`) que carrega os dados dele automaticamente do banco.
  Não existem arquivos físicos por convidado: é uma única página dinâmica.
- **Credencial digital** — cartão estilo VIP com nome, equipe e status, que
  muda para "Confirmado" com uma animação de carimbo assim que o convidado
  confirma presença.
- **Dashboard em tempo real** — total de convidados, confirmados, pendentes,
  distribuição por equipe e taxa de confirmação.
- Arquitetura pronta para crescer: placar, ranking, pontuação de provas,
  cronograma e galeria de fotos podem ser adicionados sem reescrever nada
  (veja [Roadmap](#roadmap-futuro)).

---

## Stack técnica

| Camada          | Tecnologia                                  |
| --------------- | -------------------------------------------- |
| Framework       | Next.js 14 (App Router) + TypeScript          |
| Estilo          | Tailwind CSS                                  |
| Banco de dados  | Supabase (Postgres)                           |
| Autenticação    | Cookie de sessão assinado (HMAC) para o admin |
| Deploy          | Vercel                                        |
| Validação       | Zod                                           |

Todas as escritas no banco (criar/editar/excluir convidados, alterar
configurações) passam pelas **rotas de API do Next.js**, que usam a
`SUPABASE_SERVICE_ROLE_KEY` no servidor. O cliente nunca fala diretamente
com o Supabase — isso mantém o Row Level Security travado e os dados
protegidos por padrão.

---

## Estrutura do projeto

```
laura-world-cup/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing pública
│   │   ├── layout.tsx                  # Layout raiz (fontes, metadata)
│   │   ├── globals.css
│   │   ├── convite/[slug]/
│   │   │   ├── page.tsx                # Página do convidado (dinâmica)
│   │   │   └── not-found.tsx
│   │   ├── admin/
│   │   │   ├── login/page.tsx          # Login do painel (fora da proteção)
│   │   │   └── (protected)/
│   │   │       ├── layout.tsx          # Aplica o AdminShell
│   │   │       ├── dashboard/page.tsx
│   │   │       ├── convocados/page.tsx
│   │   │       ├── equipes/page.tsx
│   │   │       ├── confirmacoes/page.tsx
│   │   │       └── configuracoes/page.tsx
│   │   └── api/
│   │       ├── auth/login|logout/route.ts
│   │       ├── guests/route.ts               # GET (lista) / POST (criar)
│   │       ├── guests/[slug]/route.ts        # GET / PATCH / DELETE
│   │       ├── guests/[slug]/confirm/route.ts# POST público (confirmar presença)
│   │       └── config/route.ts               # GET / PATCH
│   ├── components/
│   │   ├── ui/            # Button, Card, Badge, ProgressBar, StatCard
│   │   ├── admin/         # AdminShell, GuestTable, GuestFormModal
│   │   └── guest/         # Credential, TeamRevealCard, ConfirmSection, SectionCard
│   ├── hooks/useGuests.ts # Data fetching + mutations do painel
│   ├── lib/
│   │   ├── supabase/admin.ts   # Cliente com Service Role Key (servidor)
│   │   ├── supabase/client.ts  # Cliente anon (reservado para o futuro)
│   │   ├── auth.ts             # Sessão do admin (HMAC)
│   │   └── utils.ts            # slugify, stats, formatação de datas
│   └── types/index.ts
├── supabase/schema.sql    # Schema completo do banco
├── middleware.ts          # Protege todas as rotas /admin/*
├── .env.example
└── README.md
```

---

## 1. Instalação local

Pré-requisitos: Node.js 18.18+ e uma conta gratuita no [Supabase](https://supabase.com).

```bash
# 1. instale as dependências
npm install

# 2. copie o arquivo de variáveis de ambiente
cp .env.example .env.local
```

Preencha o `.env.local` (veja a seção 2 para pegar as chaves do Supabase):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASSCODE=escolha-uma-senha
ADMIN_SESSION_SECRET=gere-com-openssl-rand-hex-32
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Gere uma chave de sessão aleatória:

```bash
openssl rand -hex 32
```

Rode o projeto:

```bash
npm run dev
```

Acesse `http://localhost:3000`. O painel fica em `/admin/login`.

---

## 2. Configurando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com) (gratuito).
2. Vá em **Project Settings → API** e copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ nunca exponha essa
     chave no navegador ou em repositórios públicos)
3. Vá em **SQL Editor**, cole o conteúdo de `supabase/schema.sql` e clique em
   **Run**. Isso cria as tabelas `guests` e `event_config` com Row Level
   Security ativado.
4. Pronto — o app já consegue ler e escrever no banco.

---

## 3. Publicando na Vercel

1. Crie um repositório no GitHub e envie o projeto:

   ```bash
   git init
   git add .
   git commit -m "Laura World Cup — Chapter 22"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/laura-world-cup.git
   git push -u origin main
   ```

2. Acesse [vercel.com](https://vercel.com), clique em **Add New → Project** e
   importe o repositório.
3. Em **Environment Variables**, adicione as mesmas chaves do `.env.local`
   (incluindo `NEXT_PUBLIC_SITE_URL`, mas com o domínio final da Vercel, ex:
   `https://laura-world-cup.vercel.app`).
4. Clique em **Deploy**. Em poucos minutos o site estará no ar em HTTPS,
   pronto para ser acessado pelo navegador do WhatsApp em qualquer celular.

---

## 4. Usando o painel administrativo

Acesse `/admin/login` e entre com o `ADMIN_PASSCODE` definido no ambiente.

### Adicionar um convidado
1. Vá em **Convocados → Novo Convidado**.
2. Preencha o nome e escolha a equipe (Verde ou Vermelho).
3. Ao salvar, o sistema gera automaticamente um link único, por exemplo:
   `https://laura-world-cup.vercel.app/convite/joao-silva`
4. Copie o link pela própria tabela (ícone de copiar) e envie pelo WhatsApp.

### Trocar a equipe de alguém
Na tabela de Convocados, clique no ícone de troca (↻) ao lado do convidado,
ou edite manualmente pelo ícone de lápis.

### Acompanhar confirmações
A aba **Confirmações** mostra quem já confirmou, com data e hora, e permite
filtrar por confirmados/pendentes. O **Dashboard** resume tudo em cards e
uma barra de progresso.

### Alterar data, horário, endereço e observações
Vá em **Configurações**. Essas informações aparecem automaticamente na
página de todos os convidados.

### Manutenção futura
- Todo o CRUD de convidados e configurações é feito por API routes em
  `src/app/api`; qualquer alteração de regra de negócio deve ser feita ali.
- O schema do banco vive em `supabase/schema.sql` — mantenha-o como fonte
  da verdade e rode migrações adicionais pelo SQL Editor do Supabase.
- Trocar a senha do painel: basta atualizar `ADMIN_PASSCODE` nas variáveis
  de ambiente da Vercel e fazer um redeploy.

---

## Roadmap (futuro)

A arquitetura já está preparada para crescer sem retrabalho:

- **Placar e ranking** — nova tabela `provas` (gincanas) com pontos por
  equipe; o dashboard já tem espaço reservado para um card de ranking.
- **Cronograma do dia** — tabela `agenda` com horário/título/descrição,
  renderizada na página do convidado.
- **Galeria de fotos** — upload via Supabase Storage.
- **Resultado final das equipes** — tela de "campeão" ao final do evento.

Nenhuma dessas funcionalidades altera a estrutura atual: são novas tabelas
e novas seções, adicionadas de forma incremental.

---

## Licença

Projeto pessoal, feito sob medida para o Laura World Cup — Chapter 22. 🏆
