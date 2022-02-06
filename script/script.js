let numeroDeCartas = 0;
do{
    numeroDeCartas = parseInt(prompt("Com quantas cartas deseja jogar? Escolha de 4 a 14 cartas"));
} while (!(numeroDeCartas >= 4 && numeroDeCartas <= 14 && (numeroDeCartas % 2) == 0))

console.log(numeroDeCartas);