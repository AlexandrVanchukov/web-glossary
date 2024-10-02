# Используем образ для Next.js
FROM node:18.17.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Копируем остальные файлы
COPY ./frontend .


COPY ./frontend/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]

# # Билдим Next.js проект
# RUN npm run build

# # Запускаем Next.js
# CMD ["npm", "start"]

# Открываем порт
EXPOSE 3000