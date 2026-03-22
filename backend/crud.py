from sqlalchemy.orm import Session
import models


# -------- CLIENTS -------- #
def get_clients(db: Session):
    return db.query(models.Client).all()


# -------- TASKS -------- #
def get_tasks_by_client(db: Session, client_id: int):
    return db.query(models.Task).filter(models.Task.client_id == client_id).all()


def create_task(db: Session, task):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task_status(db: Session, task_id: int, status: str):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        return None

    task.status = status
    db.commit()
    db.refresh(task)
    return task