import { useState, useEffect } from "react";
import "../styles/chronometer.css";

export default function Chronometer({ action }) {
  const [tiempoActual, setTiempoActual] = useState(0);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
    let intervalo;

    if (corriendo) {
      intervalo = setInterval(() => {
        setTiempoActual((tiempoActual) => tiempoActual + 1);
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [corriendo]);

  function iniciarCronometro() {
    setTiempoActual(0);
    setCorriendo(true);
  }

  function detenerCronometro() {
    setCorriendo(false);
  }

  useEffect(() => {
    if (action === "start") {
      iniciarCronometro();
    } else if (action === "stop") {
      detenerCronometro();
    }
  }, [action]);

  function formatearTiempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundosRestantes.toString().padStart(2, "0")}`;
  }

  return <h2 className="chronometer">{formatearTiempo(tiempoActual)}</h2>;
}
