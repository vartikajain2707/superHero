import { useState } from "react";
import SearchBar from "./SearchBar";
import HeroComparison from "./HeroComparison";
import "./styles.css";

export default function App() {
    const [selectedHeroes, setSelectedHeroes] = useState([]);

    const handleSelectHero = (hero) => {
        setSelectedHeroes((prev) => {
            if (prev.find((h) => h.id === hero.id)) return prev;
            if (prev.length >= 5) return prev;
            return [...prev, hero];
        });
    };
    const resetComparison = () => {
        setSelectedHeroes([]);
    };
    return (
        <div className='App'>
            <h2>Superhero Search & Comparison</h2>
            <SearchBar onSelectHero={handleSelectHero} />

            {selectedHeroes.length > 0 && (
                <div>
                    <h3>Selected Heroes ({selectedHeroes.length}/5)</h3>
                    <div className="selected-heroes-grid">
                        {selectedHeroes.map(({id,name,image,biography}) => (
                            <div key={id} className="selected-hero">
                                <img src={image.url}
                                     onError={(e) => (e.target.src = `/images/${name.toLowerCase().replace(/\s+/g, '')}.jpg`)}
                                     alt={name} />
                                <p>{name}</p>
                                <div className="hero-bio">
                                    <p><strong>Full Name:</strong> {biography["full-name"] || "N/A"}</p>
                                    <p><strong>Publisher:</strong> {biography.publisher || "N/A"}</p>
                                    <p><strong>Place of Birth:</strong> {biography["place-of-birth"] || "N/A"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedHeroes.length > 0 && (
                <HeroComparison heroes={selectedHeroes} />
            )}
            <button
                className="reset-btn"
                onClick={resetComparison}
                style={{ marginTop: "20px", padding: "8px 16px", cursor: "pointer" }}
                disabled={!selectedHeroes.length}
            >
                Reset Comparison
            </button>
        </div>
    );
}
