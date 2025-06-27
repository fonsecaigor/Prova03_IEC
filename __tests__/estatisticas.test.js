// tests/estatisticas.test.js
const { calcularTaxaVitoria } = require("../src/utils/estatisticas");

describe("Função calcularTaxaVitoria", () => {
  // 🎯 Teste padrão
  it("calcula corretamente a taxa de vitória", () => {
    expect(calcularTaxaVitoria(7, 10)).toBe(70);
    expect(calcularTaxaVitoria(0, 10)).toBe(0);
    expect(calcularTaxaVitoria(5, 5)).toBe(100);
  });

  // ⚠️ Caso-limite: nenhuma partida jogada
  it("retorna 0 se o número de partidas for zero", () => {
    expect(calcularTaxaVitoria(5, 0)).toBe(0);
  });

  // ❌ Erro: valores negativos
  it("lança erro se vitórias ou partidas forem negativas", () => {
    expect(() => calcularTaxaVitoria(-1, 10)).toThrow();
    expect(() => calcularTaxaVitoria(3, -5)).toThrow();
  });

  // ❌ Erro: tipos inválidos
  it("lança erro se os parâmetros não forem números", () => {
    expect(() => calcularTaxaVitoria("5", 10)).toThrow();
    expect(() => calcularTaxaVitoria(5, null)).toThrow();
    expect(() => calcularTaxaVitoria(undefined, {})).toThrow();
  });

  // 🎯 Precisão com casas decimais
  it("retorna resultado com duas casas decimais", () => {
    expect(calcularTaxaVitoria(3, 7)).toBeCloseTo(42.86, 2);
  });
});
