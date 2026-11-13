/* =============================================================
   CONTEÚDO QUE MUDA COM FREQUÊNCIA
   - PROJETOS: galeria (home + página "Projetos")
   - ANTES_DEPOIS: comparador de transformações
   - DEPOIMENTOS: avaliações de clientes

   Para adicionar um projeto:
   1. Salve 2 arquivos em img/projetos/ — "nome.webp" (1600px) e
      "nome-sm.webp" (800px). O script tools/otimizar-imagens.py
      (na pasta do projeto, fora de site/) faz isso automaticamente.
   2. Copie uma linha abaixo e troque os textos.
   "ambiente" vira filtro automaticamente na página de projetos.
   "destaque: true" faz o projeto aparecer na home (ideal: 6).

   ⚠️ Fotos, textos e depoimentos abaixo são PROVISÓRIOS.
   ============================================================= */

window.PROJETOS = [
  { img: "cozinha-01", ambiente: "Cozinhas", titulo: "Cozinha com painel ripado", descricao: "Ripado em madeira do piso ao teto, armários aéreos com LED embutido e bancada clara.", local: "Apartamento · Centro", destaque: true },
  { img: "cozinha-02", ambiente: "Cozinhas", titulo: "Cozinha grafite integrada", descricao: "Marcenaria grafite em L, nicho para adega e integração com a sala de jantar.", local: "Apartamento · Vila Nova", destaque: true },
  { img: "cozinha-06", ambiente: "Cozinhas", titulo: "Cozinha aberta com ilha", descricao: "Ilha central com assentos, armários brancos até o teto e coifa integrada.", local: "Casa · Jardim América", destaque: true },
  { img: "cozinha-03", ambiente: "Cozinhas", titulo: "Cozinha branca compacta", descricao: "Armários brancos sem puxador aparente e bancada preta para um espaço pequeno e funcional.", local: "Apartamento · Centro" },
  { img: "cozinha-04", ambiente: "Cozinhas", titulo: "Cozinha integrada ao estar", descricao: "Marcenaria em madeira natural acompanhando as vigas do teto, com bancada para refeições rápidas.", local: "Casa de campo" },
  { img: "cozinha-05", ambiente: "Cozinhas", titulo: "Bancada em madeira maciça", descricao: "Bancada com borda orgânica, prateleiras abertas e mesa alta para o dia a dia.", local: "Casa de campo" },
  { img: "cozinha-07", ambiente: "Cozinhas", titulo: "Cozinha clássica com ilha", descricao: "Armários brancos com portas de vidro, ilha colorida e revestimento em mosaico.", local: "Casa · Alto da Serra" },
  { img: "cozinha-08", ambiente: "Cozinhas", titulo: "Cozinha em U", descricao: "Armários inferiores escuros, aéreos em laca clara e micro-ondas embutido.", local: "Apartamento · Bela Vista" },

  { img: "dormitorio-03", ambiente: "Dormitórios", titulo: "Suíte com painel iluminado", descricao: "Cabeceira em painel com iluminação indireta e marcenaria em tons de areia.", local: "Apartamento · Jardins", destaque: true },
  { img: "dormitorio-01", ambiente: "Dormitórios", titulo: "Suíte com cabeceira estofada", descricao: "Guarda-roupa branco do piso ao teto e cabeceira com módulos estofados.", local: "Apartamento · Centro" },
  { img: "dormitorio-02", ambiente: "Dormitórios", titulo: "Dormitório com armário grafite", descricao: "Armário grafite sem puxadores, painel ripado e criados-mudos suspensos.", local: "Apartamento · Vila Nova" },

  { img: "sala-02", ambiente: "Salas", titulo: "Living com armário em lâmina natural", descricao: "Armário contínuo em lâmina de madeira que organiza o ambiente sem pesar.", local: "Casa · Jardim Europa", destaque: true },
  { img: "sala-01", ambiente: "Salas", titulo: "Sala com marcenaria clássica", descricao: "Armários e painéis em laca off-white com detalhes em arco.", local: "Apartamento · Higienópolis" },
  { img: "sala-03", ambiente: "Salas", titulo: "Sala com estante embutida", descricao: "Estante embutida com portas de vidro, aparador e painel para TV.", local: "Casa · Alto da Serra" },

  { img: "banheiro-02", ambiente: "Banheiros", titulo: "Gabinete com espelho iluminado", descricao: "Gabinete suspenso em madeira escura e espelho com LED perimetral.", local: "Apartamento · Centro", destaque: true },
  { img: "banheiro-01", ambiente: "Banheiros", titulo: "Banheiro com bancadas duplas", descricao: "Dois gabinetes independentes em madeira, cubas de apoio e espelhos com moldura.", local: "Casa · Jardim América" },
  { img: "banheiro-03", ambiente: "Banheiros", titulo: "Banheiro branco com nichos", descricao: "Gabinete branco, nichos iluminados e armário alto para toalhas.", local: "Apartamento · Bela Vista" },
];

window.ANTES_DEPOIS = [
  {
    ambiente: "Cozinha",
    antes: "img/antes-depois/cozinha-antes.webp",
    depois: "img/antes-depois/cozinha-depois.webp",
    titulo: "Cozinha completa em apartamento novo",
    local: "Apartamento · Centro",
    prazo: "35 dias",
    descricao: "O apartamento foi entregue só com os pontos de água e luz. Planejamos a cozinha inteira: armários aéreos com LED, torre quente e bancada com cooktop.",
  },
  {
    ambiente: "Dormitório",
    antes: "img/antes-depois/dormitorio-antes.webp",
    depois: "img/antes-depois/dormitorio-depois.webp",
    titulo: "Suíte com guarda-roupa de parede a parede",
    local: "Apartamento · Vila Nova",
    prazo: "28 dias",
    descricao: "Mudança recente, tudo em caixas. Criamos um guarda-roupa de 2,50 m com porta espelhada e uma cabeceira em painel ripado com pendentes.",
  },
  {
    ambiente: "Sala",
    antes: "img/antes-depois/sala-antes.webp",
    depois: "img/antes-depois/sala-depois.webp",
    titulo: "Sala com painel ripado e rack suspenso",
    local: "Casa · Jardim América",
    prazo: "21 dias",
    descricao: "A TV ficava sobre uma caixa e os fios, aparentes. O painel ripado esconde a fiação, e o rack suspenso e o nicho iluminado organizam o ambiente.",
  },
];

window.DEPOIMENTOS = [
  {
    texto: "O projeto 3D ficou idêntico ao resultado final. A montagem foi rápida e deixaram tudo limpo. Nossa cozinha virou o lugar preferido da casa.",
    nome: "Mariana C.",
    detalhe: "Cozinha e lavanderia",
  },
  {
    texto: "Do primeiro atendimento à entrega, tudo dentro do prazo combinado. O guarda-roupa com porta espelhada mudou completamente o nosso quarto.",
    nome: "Ricardo e Paula",
    detalhe: "Suíte do casal",
  },
  {
    texto: "Atendimento atencioso e acabamento impecável em cada porta. Já estamos planejando o home office com eles.",
    nome: "Fernanda L.",
    detalhe: "Sala e painel de TV",
  },
];
