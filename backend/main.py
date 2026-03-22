from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models, schemas, crud
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Creates table
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------- ROOT -------- #
@app.get("/")
def root():
    return {"message": "Compliance Tracker API is running"}


# -------- SEED DATA -------- #
@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    try:
        if db.query(models.Client).count() == 0:
            db.add_all([
                models.Client(company_name="ABC Pvt Ltd", country="India", entity_type="Private"),
                models.Client(company_name="XYZ Corp", country="USA", entity_type="Corporation"),
            ])
            db.commit()
    finally:
        db.close()


# -------- APIs -------- #

# Clients
@app.get("/clients", response_model=list[schemas.Client])
def get_clients(db: Session = Depends(get_db)):
    return crud.get_clients(db)


# Tasks by Client
@app.get("/tasks/{client_id}", response_model=list[schemas.Task])
def get_tasks(client_id: int, db: Session = Depends(get_db)):
    return crud.get_tasks_by_client(db, client_id)


# Create Task
@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    # Validate client exists
    if not db.query(models.Client).filter(models.Client.id == task.client_id).first():
        raise HTTPException(status_code=404, detail="Client not found")

    return crud.create_task(db, task)


# Update Task Status
@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, data: schemas.TaskUpdate, db: Session = Depends(get_db)):
    updated_task = crud.update_task_status(db, task_id, data.status)

    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")

    return updated_task