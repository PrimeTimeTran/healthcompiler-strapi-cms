FROM node:18-alpine
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
WORKDIR /app
COPY ./package.json ./package-lock.json ./
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm install --legacy-peer-deps
COPY ./ .
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
