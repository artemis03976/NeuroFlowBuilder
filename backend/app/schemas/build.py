from pydantic import BaseModel


class BuildRequest(BaseModel):
    nodes: list
    edges: list
    version: str
    created_at: str
