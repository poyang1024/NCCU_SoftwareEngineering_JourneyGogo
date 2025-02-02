from pydantic import BaseModel

class Item(BaseModel): #serializer
    id:int
    name:str
    description:str
    price:int
    on_offer:bool

    class Config:
        from_attributes=True