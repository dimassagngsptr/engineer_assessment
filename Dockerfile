FROM golang:1.22-alpine

WORKDIR /app

RUN apk update && apk add --no-cache git && \
    go install github.com/cosmtrek/air@latest

COPY go.mod go.sum ./
RUN go mod download

COPY . .

ENV PORT=3000
ENV GIN_MODE=release

RUN go build -o main .

EXPOSE 3000

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh


CMD ["/app/entrypoint.sh"]
