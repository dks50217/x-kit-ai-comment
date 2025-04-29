FROM node:20-bullseye

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY . .

RUN bun install

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", ".", "-l", "80"]