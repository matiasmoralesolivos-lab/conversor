const btn = document.getElementById("btnConvertir");
const resultado = document.getElementById("resultado");
const error = document.getElementById("error");

let chart;

btn.addEventListener("click", async () => {
  const monto = document.getElementById("monto").value;
  const moneda = document.getElementById("moneda").value;

  resultado.innerHTML = "";
  error.innerHTML = "";

  if (!monto || !moneda) {
    error.innerHTML = "Debes ingresar monto y seleccionar moneda";
    return;
  }

  try {
    const res = await fetch("mindicador.json");
    const data = await res.json();

    const valor = data[moneda].valor;

    const conversion = (monto / valor).toFixed(2);

    resultado.innerHTML = `Resultado: ${conversion}`;

    const historial = generarHistorial(valor);

    renderGrafico(historial, moneda);
  } catch (err) {
    error.innerHTML = "Error al cargar el archivo JSON";
    console.error(err);
  }
});

function generarHistorial(valorActual) {
  const historial = [];

  for (let i = 0; i < 10; i++) {
    const variacion = Math.random() * 20 - 10;
    historial.push((valorActual + variacion).toFixed(2));
  }

  return historial;
}

function renderGrafico(historial, moneda) {
  const ctx = document.getElementById("grafico").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Día 1",
        "Día 2",
        "Día 3",
        "Día 4",
        "Día 5",
        "Día 6",
        "Día 7",
        "Día 8",
        "Día 9",
        "Día 10",
      ],
      datasets: [
        {
          label: `Historial ${moneda}`,
          data: historial,
          borderWidth: 2,
        },
      ],
    },
  });
}
