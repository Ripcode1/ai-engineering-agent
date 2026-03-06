# AI Engineering 5-Day Course

A full-stack AI engineering project built over 5 days, covering RAG, function calling, multi-modal AI, evaluation systems, and AI agents.

## Tech Stack

- **Backend:** Python, FastAPI, Modal (serverless), SQLite
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **AI/ML:** OpenAI API (GPT-4o, Whisper, DALL-E, TTS), CLIP, sqlite-vec

## Project Progress

| Day | Topic | What I Built |
|-----|-------|-------------|
| 1 | Foundations | Project scaffolding, FastAPI + Modal backend, React frontend, SQLite persistence |
| 2 | RAG & Function Calling | Discord scraper, similarity search with embeddings, SQL generation, tool use |
| 3 | Multi-Modal AI | Speech-to-text, image generation, image analysis (CLIP), text-to-speech pipeline |
| 4 | Evaluation Systems | Automated eval pipeline with CLIP similarity scoring + LLM-based objective checks |
| 5 | AI Agents | Executive assistant agent with Google Calendar/Gmail integration |

## Getting Started

### Prerequisites

- [UV](https://astral.sh/uv) (Python package manager)
- [Bun](https://bun.sh) (JavaScript runtime)
- [Modal](https://modal.com) account
- OpenAI API key

### Backend Setup

```bash
cd backend_service
uv add fastapi modal python-dotenv
uv run modal setup
# Create .env with your OPENAI_API_KEY
uv run modal serve src.modal_app.main
```

### Frontend Setup

```bash
cd frontend_service
bun install
# Create .env with VITE_MODAL_URL=your_modal_url
bun run dev
```

Open http://localhost:5173 to see the app.

## Structure

```
starter_template/
├── backend_service/
│   ├── src/modal_app/
│   │   ├── __init__.py
│   │   ├── common.py      # Shared config (Modal app, FastAPI, DB)
│   │   └── main.py         # API endpoints and Modal functions
│   ├── pyproject.toml
│   └── .env.example
├── frontend_service/
│   ├── src/
│   │   ├── App.tsx          # Main UI component
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Tailwind imports
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
├── .gitignore
└── README.md
```

## Author

Built by [@RipCode01](https://github.com/RipCode01)
