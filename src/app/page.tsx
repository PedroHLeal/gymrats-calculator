// pages/index.tsx
"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

const exercises = [
  { name: "Musculação", qty_per_point: 7, unit: "minutos" },
  { name: "Caminhada", qty_per_point: 1, unit: "km" },
  { name: "Corrida", qty_per_point: 0.6, unit: "km" },
  { name: "Corrida Esteira", qty_per_point: 0.7, unit: "km" },
  { name: "Escada Máquina", qty_per_point: 6, unit: "min" },
  { name: "Ciclismo", qty_per_point: 3, unit: "km" },
  // Adicione mais aqui
];

function formatMinutes(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function Home() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [mode, setMode] = useState<"toPoints" | "toQuantity">("toPoints");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const selectedExercise = exercises[exerciseIndex];

  useEffect(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult(null);
      return;
    }
    if (mode === "toPoints") {
      setResult(value / selectedExercise.qty_per_point);
    } else {
      setResult(value * selectedExercise.qty_per_point);
    }
  }, [inputValue, mode, selectedExercise]);

  return (
    <>
      <Head>
        <title>GymRats Calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-[#fef5f2] text-black flex items-center justify-center p-4">
        <div className="bg-white text-black w-full max-w-md md:max-w-lg rounded-xl shadow-md p-6 space-y-6">
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
            <h1 className="text-2xl font-bold text-center">GymRats Calculator 🐭💪</h1>
          </div>

          <div>
            <label className="font-semibold">Selecione o exercício:</label>
            <select
              className="w-full mt-1 border border-gray-300 rounded p-2"
              value={exerciseIndex}
              onChange={(e) => setExerciseIndex(parseInt(e.target.value))}
            >
              {exercises.map((ex, idx) => (
                <option value={idx} key={ex.name}>
                  {ex.name} ({ex.qty_per_point} {ex.unit}/ponto)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-semibold">O que você quer saber?</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => setMode("toQuantity")}
                className={`flex-1 p-2 rounded border text-center ${
                  mode === "toQuantity" ? "bg-[#f87171] text-white" : "bg-white border-gray-400"
                }`}
              >
                Quanto do exercício para ganhar pontos?
              </button>
              <button
                onClick={() => setMode("toPoints")}
                className={`flex-1 p-2 rounded border text-center ${
                  mode === "toPoints" ? "bg-[#f87171] text-white" : "bg-white border-gray-400"
                }`}
              >
                Quantos pontos ganho?
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold">
              {mode === "toQuantity"
                ? "Quantos pontos você quer?"
                : `Quanto você fez de ${selectedExercise.name}? (${selectedExercise.unit})`}
            </label>
            <input
              type="number"
              className="w-full mt-1 border border-gray-300 rounded p-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          {result !== null && (
            <div className="text-center font-semibold text-lg mt-4">
              {mode === "toQuantity"
                ? selectedExercise.unit.toLowerCase().includes("min")
                  ? `Você deve fazer ${formatMinutes(result * 60)} (${selectedExercise.unit})`
                  : `Você deve fazer ${result.toFixed(2)} ${selectedExercise.unit}`
                : `Você ganhou ${result.toFixed(2)} ponto(s)`}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
