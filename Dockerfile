FROM golang:latest

ENV GOROOT /usr/local/go
ENV GOPATH /go

RUN apt-get update && apt-get upgrade -y && apt-get install apt-transport-https -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install yarn nodejs -y

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

RUN rm -rf build && mkdir build
RUN yarn --pure-lockfile && yarn build

ENV GIN_MODE=release
EXPOSE 8000/tcp

CMD ["jira-status"]
