from fastapi import FastAPI, Depends, HTTPException
from typing import List, Annotated
from app import models
# 引入engine及database設定好的SessionLocal
from app.database import engine, SessionLocal
# 引入Session
from sqlalchemy.orm import Session

app = FastAPI()
# 在資料庫中建立剛剛models中設定好的資料結構
models.Base.metadata.create_all(bind=engine)

# 每次操作get_db時，db使用SessionLocal中提供的資料與資料庫連線，產生db存儲，完事後關閉
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 一個db的dependency，可以看做是要操作的db，這裡的Depends對應get_db，get_db對應SessionLocal    
db_dependency = Annotated[Session, Depends(get_db)]

@app.get('/questions/{question_id}')
async def get_a_question(question_id:int, db:db_dependency):
    result = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not result:
        raise HTTPException(status_code=404, detail='This id\'s question is not found...')
    return result

@app.get('/users')
async def get_a_question(db:db_dependency):
    result = db.query(models.User).all()
    if not result:
        raise HTTPException(status_code=404, detail='This id\'s question is not found...')
    return result

