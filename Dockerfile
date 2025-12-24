FROM oven/bun:1-slim
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --production
COPY . .
RUN bun run build
COPY --from=builder /app/build /app/build
# 컨테이너 시작 시 /app/build의 정적파일을 호스트 ./frontend에 복사하고 계속 실행
CMD ["sh", "-c", "mkdir -p /var/www/frontend && cp -r /app/build/* /var/www/frontend/ && sleep infinity"]
