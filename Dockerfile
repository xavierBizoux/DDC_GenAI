FROM node:22-alpine as builder
WORKDIR /app
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY $GEMINI_API_KEY
COPY package.json .
RUN NODE_ENV=development npm install --legacy-peer-dep
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80/tcp
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]