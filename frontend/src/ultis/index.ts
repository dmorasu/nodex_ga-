


export function formatoFecha(isoString?: string | null) {
  if (!isoString) return "Sin fecha";

  const fecha = new Date(isoString);
fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());

  const fechaTexto = fecha.toLocaleDateString("es-CO", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return fechaTexto;
}
export function toDateInput(value?: string | null) {
  if (!value) return ""
  return value.split("T")[0]   // "2026-02-13"
}

export function formatoFechaFinaizacion(isoString?: string | null) {
  if (!isoString) return "Trámite sin Finalizar";

  const fecha = new Date(isoString);

  if (isNaN(fecha.getTime())) {
    return "Trámite sin Finalizar";
  }

  const fechaTexto = fecha.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const horaTexto = fecha
    .toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace("a. m.", "a.m.")
    .replace("p. m.", "p.m.");

  return `${fechaTexto}, ${horaTexto}`;
}

export function formatoMoneda(
  valor?: number | string | null,
  mostrarCentavos: boolean = false
) {
  if (valor === null || valor === undefined || valor === "") {
    return "$0";
  }

  const numero = Number(valor);

  if (isNaN(numero)) {
    return "$0";
  }

  return numero.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: mostrarCentavos ? 2 : 0,
    maximumFractionDigits: mostrarCentavos ? 2 : 0,
  });
}