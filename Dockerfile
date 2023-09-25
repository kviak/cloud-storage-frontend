#STAGE 1
FROM node:latest AS anular

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build


FROM httpd:latest

WORKDIR /usr/local/apache2/htdocs
COPY --from=anular /app/dist/frontend .

