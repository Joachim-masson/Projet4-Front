import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import homer_eyes from "../assets/homer_eyes.png";
import "./Accueil.css";

export default function Accueil() {
  // Référence pour stocker nos deux pupilles
  const pupilsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pupilsRef.current.forEach((pupil) => {
        if (!pupil) return;

        const rect = pupil.getBoundingClientRect();
        // On calcule le centre de la pupille pour plus de précision
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        // On réduit le diviseur (20 au lieu de 30) pour donner un peu plus d'amplitude
        const x = (e.clientX - eyeCenterX) / 25;
        const y = (e.clientY - eyeCenterY) / 25;

        pupil.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="Accueil-container">
      <Link to="/home" className="Accueil-link">
        <div className="Homer-wrapper">
          <img src={homer_eyes} className="Accueil-Homer" alt="Entrer sur le site" />
          
          {/* Conteneur des yeux positionné par dessus l'image */}
          <div className="Eyes-overlay">
            <div className="Eye-socket left">
              <div 
                className="Pupil" 
                ref={(el) => {pupilsRef.current[0] = el}} 
              />
            </div>
            <div className="Eye-socket right">
              <div 
                className="Pupil" 
                ref={(el) => {pupilsRef.current[1] = el}} 
              />
            </div>
          </div>
        </div>
      </Link>
    </main>
  );
}