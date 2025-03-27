from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import build, train


app = FastAPI(title="Graphic AI Builder API", version="0.0.1")
# configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load routers
app.include_router(
    build.router,
    prefix="/api/build",
    tags=["Model Generation"]
)

app.include_router(
    train.router,
    prefix="/api/train",
    tags=["Model Training"]
)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8379, reload=True)
