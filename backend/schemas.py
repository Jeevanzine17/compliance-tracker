from pydantic import BaseModel, Field
from datetime import date

# -------- CLIENT -------- #
class ClientBase(BaseModel):
    company_name: str = Field(..., min_length=2)
    country: str
    entity_type: str


class Client(ClientBase):
    id: int

    class Config:
        from_attributes = True


# -------- TASK -------- #
class TaskBase(BaseModel):
    title: str = Field(..., min_length=2)
    description: str | None = None
    category: str
    due_date: date
    priority: str
    client_id: int


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    status: str

    class Config:
        from_attributes = True


class TaskUpdate(BaseModel):
    status: str = Field(..., pattern="^(Pending|Completed)$")