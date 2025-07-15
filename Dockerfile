# Etapa 1: servir usando node
FROM node:20-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package.json .
RUN pnpm install

COPY . .
RUN pnpm build

# Etapa 2: servir usando nginx

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
