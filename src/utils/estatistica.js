function calcularTaxaVitoria(vitorias, partidas) {
  if (typeof vitorias !== "number" || typeof partidas !== "number") {
    throw new Error("Parâmetros devem ser números");
  }
  if (partidas <= 0) return 0;
  if (vitorias < 0 || partidas < 0) {
    throw new Error("Valores negativos não são permitidos");
  }

  return parseFloat(((vitorias / partidas) * 100).toFixed(2));
}

module.exports = { calcularTaxaVitoria };
