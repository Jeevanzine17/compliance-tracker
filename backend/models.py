from sqlalchemy import Column, Integer, String, Date, ForeignKey
from database import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String)
    country = Column(String)
    entity_type = Column(String)


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    title = Column(String)
    description = Column(String, nullable=True)
    category = Column(String)
    due_date = Column(Date)
    status = Column(String, default="Pending")
    priority = Column(String)