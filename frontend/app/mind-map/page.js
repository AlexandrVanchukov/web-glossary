"use client"
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { server } from '@/env/env';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export default function MindMap() {
    const [mindMap, setMindMap] = useState({ nodes: [], links: [] });
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(server + '/api/mind-map')
        const data = await response.json();
        setMindMap(data);
      }
      fetchData();
    }, []);
    console.log(mindMap);
    function nodePaint({ x, y }, color, ctx) {
        // Рисуем стандартный кружок узла
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = color; // Цвет кружка узла
        ctx.fill();
      }

      return (
          <div>
              <ForceGraph2D
                graphData={mindMap}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name || node.id;

                    nodePaint(node, "#4cbb17", ctx);

                    const fontSize = 3;
                    ctx.font = `${fontSize}px Arial`;
                    ctx.fillStyle = "#23282b"; // Цвет текста узла
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";

                    // Разделяем текст по строкам
                    const lines = label.split('\n');
                    const lineHeight = fontSize * 1.2; // Устанавливаем расстояние между строками

                    // Отрисовываем каждую строку с вертикальным смещением
                    lines.forEach((line, index) => {
                        ctx.fillText(line, node.x, node.y + index * lineHeight - (lines.length - 1) * lineHeight / 2);
                    });
                    
                    
                  }}
                  nodePointerAreaPaint={nodePaint}
                  linkCanvasObject={(link, ctx, globalScale) => {
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
          
                    // Рисуем линию связи
                    ctx.beginPath();
                    ctx.moveTo(link.source.x, link.source.y);
                    ctx.lineTo(link.target.x, link.target.y);
                    ctx.strokeStyle = "#c1caca"; // Цвет линии связи
                    ctx.stroke();
          
                    // Рисуем стрелку на конце линии
                    const arrowLength = 14; // Длина стрелки
                    const arrowWidth = 2; // Ширина стрелки
          
                    // Вычисляем угол наклона линии
                    const angle = Math.atan2(
                      link.target.y - link.source.y,
                      link.target.x - link.source.x
                    );
          
                    // Координаты конца стрелки (начало линии)
                    const arrowX = link.target.x - arrowLength * Math.cos(angle);
                    const arrowY = link.target.y - arrowLength * Math.sin(angle);
          
                    ctx.beginPath();
                    ctx.moveTo(link.target.x, link.target.y);
                    ctx.lineTo(
                      arrowX - arrowWidth * Math.sin(angle),
                      arrowY + arrowWidth * Math.cos(angle)
                    );
                    ctx.lineTo(
                      arrowX + arrowWidth * Math.sin(angle),
                      arrowY - arrowWidth * Math.cos(angle)
                    );
                    ctx.closePath();
                    ctx.fillStyle = "#c1caca"; // Цвет стрелки
                    ctx.fill();

                     // Текст связи
                    const label = link.name || `${link.source} -> ${link.target}`;
                    const fontSize = 2 ;
                    ctx.font = `${fontSize}px Arial`;
                    ctx.fillStyle = "#3a4247"; // Цвет текста связи

                    // Разделяем текст на строки
                    const lines = label.split('\n');
                    const lineHeight = fontSize * 1.2; // Расстояние между строками

                    // Находим середину связи для текста
                    const middleX = (link.source.x + link.target.x) / 2;
                    const middleY = (link.source.y + link.target.y) / 2;

                    // Рисуем каждую строку с вертикальным смещением
                    lines.forEach((line, index) => {
                        ctx.fillText(line, middleX, middleY + index * lineHeight - (lines.length - 1) * lineHeight / 2);
                    });
                  }}
                  maxZoom={10}
                  minZoom={4}
                />
          </div>
      );
  }