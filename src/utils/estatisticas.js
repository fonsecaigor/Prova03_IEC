function calcularTaxaVitoria(vitorias, partidas) {
  if (typeof vitorias !== "number" || typeof partidas !== "number") {
    throw new Error("Parâmetros devem ser números");
  }

  if (vitorias < 0 || partidas < 0) {
    throw new Error("Vitórias e partidas não podem ser negativas");
  }

  if (partidas === 0) return 0;

  return Number(((vitorias / partidas) * 100).toFixed(2));
}

module.exports = { calcularTaxaVitoria };
