.PHONY: test lint

test:
	npm test

lint:
	npm run lint

ci:
	npm ci && npm run lint && npm test
