// =============================================
// AGRINHO 2026 — Agro Forte, Futuro Sustentável
// Arquivo: script.js
// Descrição: Interatividade do site
// =============================================

// --- QUIZ: perguntas, opções e respostas ---
const perguntas = [
  {
    pergunta: "O que é a Reserva Legal prevista no Código Florestal Brasileiro?",
    opcoes: [
      "Uma área de terra que o agricultor pode vender ao governo",
      "Uma porcentagem da propriedade rural que deve ser preservada com vegetação nativa",
      "Um imposto cobrado de quem desmata ilegalmente",
      "Uma zona industrial próxima a áreas rurais"
    ],
    correta: 1,
    explicacao: "Correto! A Reserva Legal é uma obrigação do Código Florestal que exige preservação de vegetação nativa em parte da propriedade."
  },
  {
    pergunta: "O que a agricultura de precisão usa para aplicar insumos apenas onde necessário?",
    opcoes: [
      "Trabalho manual intensivo",
      "Queimadas controladas",
      "Drones, sensores e tecnologia GPS",
      "Apenas adubo orgânico espalhado uniformemente"
    ],
    correta: 2,
    explicacao: "Exato! A agricultura de precisão usa tecnologia para reduzir desperdício de insumos e impacto ambiental."
  },
  {
    pergunta: "Qual é a porcentagem mínima de Reserva Legal exigida para propriedades no bioma Amazônia?",
    opcoes: ["20%", "50%", "80%", "100%"],
    correta: 2,
    explicacao: "Isso mesmo! Na Amazônia, a legislação exige 80% de Reserva Legal, a maior porcentagem entre todos os biomas."
  },
  {
    pergunta: "O que são matas ciliares?",
    opcoes: [
      "Florestas plantadas para produção de madeira",
      "Vegetação que protege as margens de rios e córregos",
      "Plantas cultivadas em estufas de vidro",
      "Árvores usadas para separar propriedades rurais"
    ],
    correta: 1,
    explicacao: "Correto! As matas ciliares ficam nas margens dos cursos d'água e são fundamentais para evitar erosão e proteger a água."
  },
  {
    pergunta: "O que é biogás no contexto da agropecuária sustentável?",
    opcoes: [
      "Um tipo de agrotóxico moderno",
      "Gás produzido a partir de dejetos animais, usado como fonte de energia",
      "Um fertilizante químico importado",
      "Um gás tóxico emitido pela queima de florestas"
    ],
    correta: 1,
    explicacao: "Isso! O biogás é produzido pela decomposição de resíduos orgânicos e dejetos animais, transformando um problema em energia limpa."
  }
];

// Variáveis de controle do quiz
var indicePergunta = 0;
var pontuacao = 0;
var respondeu = false;

// Função que carrega uma pergunta na tela
function carregarPergunta() {
  respondeu = false;

  var dados = perguntas[indicePergunta];
  var elementoPergunta = document.getElementById("quiz-pergunta");
  var elementoOpcoes = document.getElementById("quiz-opcoes");
  var elementoFeedback = document.getElementById("quiz-feedback");
  var btnProxima = document.getElementById("btn-proxima");
  var resultado = document.getElementById("quiz-resultado");

  // Atualiza o texto da pergunta
  elementoPergunta.textContent = "Pergunta " + (indicePergunta + 1) + " de " + perguntas.length + ": " + dados.pergunta;
  elementoFeedback.textContent = "";
  btnProxima.style.display = "none";
  resultado.style.display = "none";
  elementoOpcoes.innerHTML = "";

  // Cria os botões de resposta
  dados.opcoes.forEach(function(opcao, indice) {
    var botao = document.createElement("button");
    botao.textContent = opcao;
    botao.addEventListener("click", function() {
      verificarResposta(indice);
    });
    elementoOpcoes.appendChild(botao);
  });
}

// Função que verifica se a resposta está correta
function verificarResposta(indiceEscolhido) {
  if (respondeu) return; // Impede clique duplo
  respondeu = true;

  var dados = perguntas[indicePergunta];
  var botoes = document.querySelectorAll(".quiz-opcoes button");
  var feedback = document.getElementById("quiz-feedback");
  var btnProxima = document.getElementById("btn-proxima");

  // Desabilita todos os botões após responder
  botoes.forEach(function(botao) {
    botao.disabled = true;
  });

  if (indiceEscolhido === dados.correta) {
    botoes[indiceEscolhido].classList.add("correta");
    feedback.textContent = "✅ " + dados.explicacao;
    feedback.style.color = "#b7e4c7";
    pontuacao++;
  } else {
    botoes[indiceEscolhido].classList.add("errada");
    botoes[dados.correta].classList.add("correta");
    feedback.textContent = "❌ Errado! " + dados.explicacao;
    feedback.style.color = "#ffaaaa";
  }

  // Decide o que mostrar: próxima pergunta ou resultado final
  if (indicePergunta < perguntas.length - 1) {
    btnProxima.style.display = "inline-block";
  } else {
    mostrarResultado();
  }
}

// Função que exibe o resultado final do quiz
function mostrarResultado() {
  var resultado = document.getElementById("quiz-resultado");
  var mensagem = "";

  if (pontuacao === perguntas.length) {
    mensagem = "🏆 Nota máxima! Você acertou todas as " + perguntas.length + " perguntas. Parabéns, você é um(a) expert em sustentabilidade!";
  } else if (pontuacao >= 3) {
    mensagem = "🌱 Muito bem! Você acertou " + pontuacao + " de " + perguntas.length + " perguntas. Continue aprendendo sobre o agro sustentável!";
  } else {
    mensagem = "📚 Você acertou " + pontuacao + " de " + perguntas.length + " perguntas. Vale a pena revisar o conteúdo e tentar de novo!";
  }

  resultado.textContent = mensagem;
  resultado.style.display = "block";
}

// Botão de próxima pergunta
document.getElementById("btn-proxima").addEventListener("click", function() {
  indicePergunta++;
  carregarPergunta();
});

// Inicia o quiz ao carregar a página
carregarPergunta();

// --- CALCULADORA DE RESERVA LEGAL ---
document.getElementById("btn-calcular").addEventListener("click", function() {
  var areaTotal = parseFloat(document.getElementById("area-total").value);
  var porcentagem = parseFloat(document.getElementById("bioma").value);
  var elementoResultado = document.getElementById("calc-resultado");

  // Validação da entrada
  if (isNaN(areaTotal) || areaTotal <= 0) {
    elementoResultado.textContent = "⚠️ Por favor, insira uma área válida maior que zero.";
    elementoResultado.style.color = "#c0392b";
    return;
  }

  // Cálculos
  var areaReserva = (areaTotal * porcentagem) / 100;
  var areaProductiva = areaTotal - areaReserva;

  // Exibe o resultado formatado
  elementoResultado.style.color = "#1a3a2a";
  elementoResultado.innerHTML =
    "🌳 Área de Reserva Legal obrigatória: <strong>" + areaReserva.toFixed(1) + " hectares</strong><br>" +
    "🌾 Área disponível para produção: <strong>" + areaProductiva.toFixed(1) + " hectares</strong><br>" +
    "<small style='font-weight:400; color:#3d5a3d;'>Base legal: Lei nº 12.651/2012 — Código Florestal Brasileiro</small>";
});

// --- ANIMAÇÃO DOS CONTADORES ---
// Função que anima um número de 0 até o valor alvo
function animarContador(elemento, valorAlvo, duracao) {
  var inicio = 0;
  var incremento = valorAlvo / (duracao / 16); // 60fps aproximado

  var intervalo = setInterval(function() {
    inicio += incremento;
    if (inicio >= valorAlvo) {
      inicio = valorAlvo;
      clearInterval(intervalo);
    }
    elemento.textContent = Math.floor(inicio);
  }, 16);
}

// Usa o IntersectionObserver para disparar a animação quando a seção aparecer na tela
var dadosNumericos = document.querySelectorAll(".dado-numero");

var observador = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada) {
    if (entrada.isIntersecting) {
      var elemento = entrada.target;
      var valorAlvo = parseInt(elemento.getAttribute("data-alvo"));
      animarContador(elemento, valorAlvo, 1500);
      observador.unobserve(elemento); // Anima apenas uma vez
    }
  });
}, { threshold: 0.5 });

dadosNumericos.forEach(function(numero) {
  observador.observe(numero);
});
