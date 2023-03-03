import { useState, useEffect } from "react";
import "../styles/chronometer.css";
import { formatearTiempo } from "../utilities/functions";

export default function Chronometer({ action, handleScores, won }) {
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

  function reiniciarCronometro() {
    setTiempoActual(0);
    setCorriendo(false);
  }

  useEffect(() => {
    if (won) handleScores(tiempoActual);

    if (action === "start") {
      iniciarCronometro();
    } else if (action === "stop") {
      detenerCronometro();
      if (tiempoActual > 0) {
        handleScores(tiempoActual);
      }
    } else if (action === "reset") {
      reiniciarCronometro();
    }
  }, [action]);

  return <h2 className="chronometer">{formatearTiempo(tiempoActual)}</h2>;
}
