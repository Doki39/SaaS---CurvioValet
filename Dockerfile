# CurvioValet marketing site — static Expo web export served by nginx

FROM node:20-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG EXPO_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV EXPO_PUBLIC_WEB3FORMS_ACCESS_KEY=$EXPO_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV CI=1

RUN npx expo export --platform web

FROM nginx:1.27-alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
