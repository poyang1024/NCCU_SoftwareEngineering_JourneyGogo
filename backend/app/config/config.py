from pathlib import Path
from typing import List
from pydantic import AnyHttpUrl, EmailStr
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"

    # SECRET_KEY for JWT token generation
    # Calling secrets.token_urlsafe will generate a new secret everytime
    # the server restarts, which can be quite annoying when developing, where
    # a stable SECRET_KEY is preferred.

    # SECRET_KEY: str = secrets.token_urlsafe(32)
    SECRET_KEY: str = "temporarysecretkey"

    # Email config
    RESET_PWD_CALLBACK_URL: str = "http://localhost:5173/reset-password"
    # mail service
    MAIL_PASSWORD: str = "czfmjoxpghgrayvt"
    MAIL_TEMPLATE_PATH:str = str(Path(__file__).parent.parent /'template')

    # database configurations
    POSTGRES_SERVER: str = "localhost"  # Replace with your PostgreSQL host if needed
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "changethis"  # Update with your actual password
    POSTGRES_DB: str = "app"

    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SERVER_NAME: str = "TEST"
    SERVER_HOST: AnyHttpUrl = "http://localhost"
    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    PROJECT_NAME: str = ""

    FIRST_SUPERUSER: EmailStr = ""
    FIRST_SUPERUSER_PASSWORD: str = ""

    # SSO ID and Secrets
    GOOGLE_CLIENT_ID: str = "614465037069-hjva621jk248si4r85ho16jf061286fc.apps.googleusercontent.com"
    GOOGLE_CLIENT_SECRET: str = "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"
    FACEBOOK_CLIENT_ID: str = ""
    FACEBOOK_CLIENT_SECRET: str = ""
    SSO_CALLBACK_HOSTNAME: str = ""
    SSO_LOGIN_CALLBACK_URL: str = ""

    DATABASE_URL: str = '' # your database url

    class Config:
        env_file = ".env.dev"
        # orm_mode = True

settings = Settings()