from typing import Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID


class PasswordUpdate(BaseModel):
    """
    Check old password valid
    """

    password: str = None


class UserBase(BaseModel):
    """
    Shared User properties. Visible by anyone.
    """

    first_name: Optional[str] = None
    last_name: Optional[str] = None
    picture: Optional[str] = None


class PrivateUserBase(UserBase):
    """
    Shared User properties. Visible only by admins and self.
    """

    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False
    provider: Optional[str] = None


class UserUpdate(UserBase):
    """
    User properties to receive via API on update.
    """

    password: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False


class User(PrivateUserBase):
    """
    User properties returned by API. Contains private
    user information such as email, is_active, auth provider.

    Should only be returned to admins or self.
    """
    uuid: UUID

class EmailSchema(BaseModel):
    email: EmailStr
    redirect_link: str