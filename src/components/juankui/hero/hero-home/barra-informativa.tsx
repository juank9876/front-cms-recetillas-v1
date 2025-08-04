// src/components/juankui/hero/hero-home/barra-informativa.tsx
"use client";
import { useState } from "react";

const paises = [
    { value: "ESPAÑA", label: "ESPAÑA" },
    { value: "MÉXICO", label: "MÉXICO" },
    { value: "ARGENTINA", label: "ARGENTINA" },
    // Agrega más países si lo necesitas
];

export function BarraInformativa() {
    const [pais, setPais] = useState("ESPAÑA");

    // Simulación de fecha y hora actual
    const fecha = new Date();
    const fechaStr = fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
    const horaStr = fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="flex items-center gap-2 text-xs md:text-sm px-2 py-1 bg-white ">
            <span className="text-xs">{fechaStr}</span>
            <span className="mx-1 text-sm">|</span>
            <span className="text-xs">Actualizado {horaStr}</span>
            <span className="mx-1 text-sm">|</span>
            <span className="text-sm">CEST</span>
            <span className="mx-1 text-sm">|</span>
            <span className="text-sm">Seleccione:</span>
            <select
                className="ml-1 px-2 py-1 border rounded font-bold"
                value={pais}
                onChange={e => setPais(e.target.value)}
            >
                {paises.map((p, index) => (
                    <option id={index.toString()} key={p.value} value={p.value}>{p.label}</option>
                ))}
            </select>
        </div>
    );
}