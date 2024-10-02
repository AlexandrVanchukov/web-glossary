"use client";  // Добавь это на первой строке

import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import env from "../env/env"

export default function Home() {
  const [glossary, setGlossary] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/glossary')
            .then(res => res.json())
            .then(data => setGlossary(data));
    }, []);

    return (
        <div>
            <h1>Glossary</h1>
            <ul>
                {glossary.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.term}:</strong> {entry.definition}
                    </li>
                ))}
            </ul>
        </div>
    );
}
