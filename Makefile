docker-build:
	docker build -t jira-status .

docker-run:
	docker run -p 8000:8000 --env-file .env -it --rm jira-status
