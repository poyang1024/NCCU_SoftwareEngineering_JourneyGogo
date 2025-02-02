import uvicorn

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.db_setup import engine, SessionLocal, get_db
from app.db.models.models import User

from app.routers.api import api_router
from app.config.config import settings
from app.db.db_setup import engine, SessionLocal, Base
from app.auth.auth import get_hashed_password

@asynccontextmanager
async def lifespan(app: FastAPI):
     # Setup PostgreSQL connection
    engine 
    SessionLocal 

    app.dependency_overrides[get_db] = get_db

    # Create tables if they don't exist (assuming models are defined)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    user = db.query(User).filter(User.email == settings.FIRST_SUPERUSER).first()
    if not user:
        hashed_password = get_hashed_password(settings.FIRST_SUPERUSER_PASSWORD)
        user = User(
            email=settings.FIRST_SUPERUSER,
            hashed_password=hashed_password,
            is_superuser=True,
        )
        db.add(user)
        db.commit()

    yield


app = FastAPI(
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).rstrip("/") for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
