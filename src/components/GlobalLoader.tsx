import React from "react";
import lecheLogo from "../assets/logo-leche.png";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1c3c87] text-white">
      <style>
        {`
          @keyframes breathing {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}
      </style>

      <div className="animate-[breathing_3s_ease-in-out_infinite] mb-6">
        <img
          src={lecheLogo}
          alt="Cargando"
          className="w-40 h-auto object-contain drop-shadow-lg"
        />
      </div>

      <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase animate-pulse">
        La Leche #1 en México
      </h1>
    </div>
  );
};

export default GlobalLoader;
