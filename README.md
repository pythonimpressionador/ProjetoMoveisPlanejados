# Site Carpintaria — Móveis Planejados

Site institucional de uma página (+ galeria de projetos), feito em **HTML, CSS e JavaScript puros**.
Não precisa de instalação, build nem servidor: é só abrir `site/index.html` no navegador.

## Estrutura

```
ProjetoMoveisPlanejados/
├── site/                     ← tudo o que vai para a hospedagem
│   ├── index.html            ← página principal
│   ├── projetos.html         ← galeria completa com filtros
│   ├── privacidade.html      ← política de privacidade (LGPD)
│   ├── creditos.html         ← créditos das fotos provisórias (apagar depois)
│   ├── css/style.css         ← visual (cores e fontes no topo, em :root)
│   ├── js/config.js          ← ✏️ DADOS DA EMPRESA (WhatsApp, endereço, horários…)
│   ├── js/dados.js           ← ✏️ PROJETOS, ANTES E DEPOIS, DEPOIMENTOS
│   ├── js/main.js            ← comportamento (não precisa mexer)
│   ├── js/icones.js          ← ícones
│   └── img/                  ← projetos/, antes-depois/, sobre/, favicon.svg
├── tools/otimizar-imagens.py ← converte fotos do cliente para o tamanho certo
└── referencias.txt
```

## Seções da home (na ordem)

1. Banner principal com botão de orçamento e atalho para o Antes e Depois
2. Ambientes (Cozinhas, Dormitórios, Salas, Banheiros + "outros ambientes")
3. **Antes e Depois**: comparador arrastável com abas por ambiente
4. Diferenciais
5. Como funciona (5 etapas)
6. Projetos em destaque (abre a janela de detalhes)
7. Depoimentos + nota do Google
8. Sobre a empresa
9. Orçamento (formulário → WhatsApp) + contato com mapa
10. Rodapé, com o botão de WhatsApp fixo em todas as páginas

## Como editar

| Quero mudar… | Onde |
|---|---|
| WhatsApp, telefone, e-mail, endereço, horários, redes, nota do Google | `site/js/config.js` |
| Projetos da galeria, pares de antes/depois, depoimentos | `site/js/dados.js` |
| Textos das seções (títulos, diferenciais, etapas, sobre) | `site/index.html` |
| Cores e fontes | topo de `site/css/style.css` (`:root`) |

Os dados de `config.js` aparecem automaticamente em todas as páginas (topo, contato, rodapé, mapa e botões de WhatsApp).
Um campo deixado vazio (`""`), como `facebook` ou `google.link`, esconde o ícone ou o botão correspondente.

### Pedidos de orçamento

Todos os pedidos vão para o número em `whatsapp` (`config.js`), no formato `55 + DDD + número`, só dígitos.
O formulário **não guarda nada**: ele monta a mensagem e abre o WhatsApp do visitante já com o texto pronto.

### Adicionar fotos de projetos

1. Coloque as fotos originais numa pasta, já com o nome final (ex.: `closet-01.jpg`), em minúsculas e sem acento.
2. Rode: `python tools/otimizar-imagens.py <pasta-das-fotos> site/img/projetos`
   (gera `closet-01.webp` com 1600 px e `closet-01-sm.webp` com 800 px)
3. Em `dados.js`, copie uma linha de `PROJETOS` e ajuste `img`, `ambiente`, `titulo`, `descricao` e `local`.
   - Um **ambiente novo** (ex.: "Closets") vira filtro sozinho na página de projetos.
   - `destaque: true` coloca o projeto na home (o ideal são 6).

### Trocar o Antes e Depois por fotos reais

- As duas fotos precisam ser tiradas **do mesmo ponto, com o mesmo enquadramento** (de preferência num tripé ou com o celular apoiado no mesmo lugar).
- Otimize com o script acima (pasta `site/img/antes-depois`) e aponte `antes` / `depois` em `ANTES_DEPOIS` (`dados.js`).

## ⚠️ Conteúdo provisório: trocar antes de publicar

- [ ] `config.js`: WhatsApp, telefone, e-mail, endereço, CEP, busca do mapa, horários, Instagram, nota e quantidade de avaliações do Google, ano de fundação, ambientes entregues, anos de garantia
- [ ] Todas as fotos de `img/projetos/` e `img/sobre/` (fotos do Wikimedia Commons, só para demonstração)
- [ ] As 3 imagens de antes e depois (`img/antes-depois/`): são **renders 3D ilustrativos**, não obras reais da Carpintaria. Trocar por fotos reais de clientes (antes e depois do mesmo ângulo)
- [ ] Depoimentos (`dados.js`), que precisam ser **reais**, com autorização do cliente
- [ ] Textos com números e promessas: prazo "30 a 45 dias", "garantia de 5 anos", "fabricação própria", "projeto 3D", "responde no mesmo dia útil"
- [ ] Logo (hoje é um logotipo provisório em texto + símbolo, em `index.html` e `img/favicon.svg`)
- [ ] `privacidade.html`: razão social e CNPJ
- [ ] Depois de trocar todas as fotos: apagar `creditos.html` e o link "Créditos das imagens" no rodapé das páginas
- [ ] Remover `<meta name="robots" content="noindex">` das 4 páginas, para o site passar a aparecer no Google

## Publicação

### Versão de prévia (atual): GitHub Pages

O site está no ar em **https://pythonimpressionador.github.io/ProjetoMoveisPlanejados/**

- Cada `git push` na branch `main` publica a pasta `site/` automaticamente em cerca de 1 minuto (`.github/workflows/publicar-site.yml`). Dá para acompanhar na aba **Actions** do repositório.
- Enquanto o conteúdo for provisório, as páginas têm `noindex` (o link funciona, mas o site não aparece nas buscas do Google).
- A prévia do link no WhatsApp usa `img/og-home.jpg` e `img/og-projetos.jpg` (1200×630, JPG).

### Mudando para outra hospedagem ou domínio próprio

Qualquer hospedagem de site estático serve (a do domínio do cliente, Netlify, Cloudflare Pages…). Basta enviar **o conteúdo da pasta `site/`**. O GitHub Pages também aceita domínio próprio.

Depois de mudar:
- Troque a URL base `https://pythonimpressionador.github.io/ProjetoMoveisPlanejados/` em `og:url` e `og:image` (no `<head>` de `index.html` e `projetos.html`) pelo novo endereço.
- Cadastre o site no Google Search Console e no Perfil da Empresa no Google (a página já envia os dados da empresa em formato estruturado para o Google).

## Notas técnicas

- Fontes: Fraunces (títulos) e Manrope (texto), via Google Fonts.
- Imagens em WebP com dois tamanhos e carregamento sob demanda (`loading="lazy"`); a galeria inteira pesa cerca de 2,7 MB.
- Acessibilidade: navegação por teclado (incluindo o comparador e a janela de projetos), textos alternativos e respeito à preferência do sistema por menos animação.
- Funciona abrindo o arquivo direto (`file://`), sem servidor.
