// Seleciona os elementos do jogo
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

// Variáveis de controle
let isJumping = false; // Para evitar múltiplos pulos
let score = 0; // Score inicial
let obstaclePassed = false; // Para verificar se o obstáculo foi passado

// Função de salto do personagem
function jump() {
  if (isJumping) return; // Impede múltiplos pulos simultâneos
  isJumping = true; // Inicia o salto

  let position = 0; // Posição inicial do salto
  const upInterval = setInterval(() => {
    if (position >= 150) { // Alcançou o pico do salto
      clearInterval(upInterval);
      // Inicia a descida
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false; // Permite outro salto
        } else {
          position -= 5;
          player.style.bottom = position + "px"; // Move o personagem para baixo
        }
      }, 20);
    } else {
      // Continua subindo
      position += 5;
      player.style.bottom = position + "px"; // Move o personagem para cima
    }
  }, 20);
}

// Função para criar e mover o obstáculo
function moveObstacle() {
  obstacle.style.right = "-30px"; // Coloca o obstáculo fora da tela
  obstaclePassed = false; // Reinicia a verificação de obstáculo passado

  const obstacleInterval = setInterval(() => {
    const obstaclePosition = parseInt(window.getComputedStyle(obstacle).right);

    // Se o obstáculo saiu da tela
    if (obstaclePosition > window.innerWidth) {
      // Reseta a posição do obstáculo
      obstacle.style.right = "-30px"; 
      obstaclePassed = false; // Reseta a verificação
      score++; // Incrementa a pontuação ao passar o obstáculo
      scoreDisplay.innerText = `Score: ${score}`; // Atualiza o score na tela
    } else {
      obstacle.style.right = (obstaclePosition + 10) + "px"; // Move o obstáculo para a direita

      // Verifica se o obstáculo foi passado
      if (obstaclePosition > window.innerWidth - 80 && !obstaclePassed) {
        score++; // Incrementa a pontuação
        scoreDisplay.innerText = `Score: ${score}`; // Atualiza o score na tela
        obstaclePassed = true; // Marca o obstáculo como passado
      }
    }

    // Verifica colisão
    checkCollision();
  }, 20);
}

// Função para detectar colisão entre o personagem e o obstáculo
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  // Verifica colisão com base na posição
  if (
    playerRect.left < obstacleRect.right &&
    playerRect.right > obstacleRect.left &&
    playerRect.bottom > obstacleRect.top
  ) {
    alert(`Game Over! Sua pontuação foi: ${score}`); // Exibe a pontuação no final
    resetGame(); // Reseta o jogo ao colidir
  }
}

// Função para iniciar o jogo
function startGame() {
  score = 0; // Reinicia a pontuação
  scoreDisplay.innerText = "Score: 0"; // Exibe o score inicial
  moveObstacle(); // Inicia a movimentação do obstáculo
}

// Função para resetar o jogo
function resetGame() {
  obstacle.style.right = "-30px"; // Reseta posição do obstáculo
  startGame(); // Reinicia o jogo
}

// Evento para capturar o salto ao pressionar a barra de espaço
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump(); // Inicia o salto
});

// Inicia o jogo ao carregar a página
startGame();
