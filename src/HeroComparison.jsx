import React, { useState } from "react";
import "./styles.css";

export default function HeroComparison({ heroes }) {
    const [hoverKey, setHoverKey] = useState(null);

    const powerstatKeys = Object.keys(heroes[0].powerstats) || [];

    const getBestHeroId = (key) => {
        let maxVal = -1000;
        let bestId = null;
        (heroes || []).forEach((hero) => {
            const val = parseInt(hero?.powerstats[key]) || 0;
            if (val > maxVal) {
                maxVal = val;
                bestId = hero?.id;
            }
        });
        return bestId;
    };
    return (
        <div className="comparison-container">
            <table className="comparison-table">
                <thead>
                <tr>
                    <th>Powerstat</th>
                    {(heroes || []).map(({id, name, image}) => (
                        <th key={id}>
                            <p>{name}</p>
                            <img src={image.url}
                                 onError={(e) => (e.target.src = `/images/${name.toLowerCase().replace(/\s+/g, '')}.jpg`)}
                                 alt={name} className="hero-thumb" />
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {(powerstatKeys || []).map((key) => {
                    const bestId = getBestHeroId(key);
                    return (
                        <tr
                            key={key}
                        >
                            <td
                                onMouseEnter={() => setHoverKey(key)}
                                onMouseLeave={() => setHoverKey(null)}
                                className="stat-key">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                            {heroes.map(({id,powerstats}) => {
                                return <td
                                    key={id}
                                    className={hoverKey === key && id === bestId ? "highlight" : ""}
                                >
                                    {powerstats[key] === 'null' ? 0 : powerstats[key]}
                                </td>
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
