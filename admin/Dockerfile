FROM node:24.14.0-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY admin ./admin
COPY src/fonts.css ./src/fonts.css
COPY src/assets/fonts ./src/assets/fonts
RUN npm run admin:build
RUN npm prune --omit=dev

FROM node:24.14.0-bookworm-slim
ENV NODE_ENV=production ADMIN_HOST=0.0.0.0 PORT=5210 ADMIN_DATA_DIR=/data
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./
COPY admin/server ./admin/server
COPY admin/shared ./admin/shared
COPY --from=build /app/admin-dist ./admin-dist
COPY .research/thoughost-albums-final.json ./.research/thoughost-albums-final.json
COPY src/assets/members ./src/assets/members
COPY src/assets/albums ./src/assets/albums
RUN mkdir /data && chown node:node /data
USER node
EXPOSE 5210
CMD ["node", "admin/server/main.ts"]
