# Dockerfile

# \--- Этап 1: Образ для разработки (с Hot Reload) ---


FROM node:20-alpine AS development


WORKDIR /app

COPY package\*.json ./

RUN npm install

COPY . .

EXPOSE 5173


CMD ["npm", "run", "dev", "--", "--host"]

# \--- Этап 2: Образ для сборки продакшен-версии ---

FROM node:20-alpine AS builder

WORKDIR /app
COPY package\*.json ./
RUN npm install
COPY . .

RUN npm run build

# \--- Этап 3: Финальный образ с Nginx для продакшена ---

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

# Команда для запуска Nginx в фоновом режиме

CMD ["nginx", "-g", "daemon off;"]