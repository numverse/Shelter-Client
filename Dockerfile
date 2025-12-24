FROM oven/bun:alpine AS builder
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install
COPY . .
RUN bun build   # Vite 등은 dist 디렉터리에 출력

FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/dist /app/dist
# 컨테이너 시작 시 /app/dist의 정적파일을 호스트 ./frontend에 복사하고 계속 실행
CMD ["sh", "-c", "mkdir -p /var/www/frontend && cp -r /app/dist/* /var/www/frontend/ && sleep infinity"]
