# Используем Node.js образ
FROM node:18.17.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Копируем остальные файлы
COPY ./backend .

# Запускаем приложение
CMD ["node", "app.js"]

# Открываем порт
EXPOSE 5000