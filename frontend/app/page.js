"use client"; 

import { useState, useEffect } from 'react';
import styles from "./page.module.css";

export default function Home() {
  const [glossary, setGlossary] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/glossary')
            .then(res => res.json())
            .then(data => setGlossary(data));
    }, []);

    const sortedGlossary = [...glossary].sort((a, b) =>
        a.term.localeCompare(b.term)
    );

    return (
        <div>
            <div className={styles.grid}>
                {sortedGlossary.map((entry, index) => (
                    <div key={index} className={styles.card}>
                        <h2 className={styles.term}>{entry.term}</h2>
                        <p className={styles.definition}>{entry.definition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
