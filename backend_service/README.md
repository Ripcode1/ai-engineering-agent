# Backend Service

Python backend using FastAPI + Modal for serverless cloud deployment with SQLite persistence.

## Setup

```bash
cd backend_service
uv add fastapi modal python-dotenv
uv run modal setup
```

## Run

```bash
uv run modal serve src.modal_app.main
```
