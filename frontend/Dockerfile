# Используем образ для Next.js
FROM node:18.17.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Копируем остальные файлы
COPY ./frontend .

# Билдим Next.js проект
RUN npm run build

# Запускаем Next.js
CMD ["npm", "start"]

# Открываем порт
EXPOSE 3000