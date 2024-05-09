from datetime import datetime, timedelta

from jose import jwt
from mkdi_backend.config import settings
from mkdi_backend.models import User
from mkdi_shared.schemas import protocol
from passlib.context import CryptContext
from sqlmodel import Session

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict) -> str:
    expires_delta = timedelta(minutes=settings.AUTH_ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.AUTH_SECRET, algorithm=settings.AUTH_ALGORITHM)
    return encoded_jwt


def get_user(db: Session, username: str) -> User:
    return db.query(User).filter(User.username == username).first()


def authenticate_user(session: Session, username: str, password: str):
    user = get_user(session, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def register_user(
    request: protocol.CreateFrontendUserRequest,
) -> protocol.User:
    return request


def get_password_hash(password):
    return pwd_context.hash(password)
