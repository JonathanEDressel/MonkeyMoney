from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional,Any

@dataclass
class PersonalAccount:
    Id: int
    UserId: Optional[int]
    Name: Optional[str]
    Type: Optional[str]
    CreatedDate: Optional[datetime]
    Records: List[Any]
    
def data_to_model(data):
    if not data:
        return None
    return PersonalAccount(
        Id=data.get('AccountId'),
        UserId=data.get('UserId'),
        Name=data.get('Name'),
        Type=data.get('Type'),
        CreatedDate=convert_datetime(data.get('CreatedDate')),
        Records=[]
    )
    
def convert_datetime(val):
    if isinstance(val, datetime):
        return val
    if val is None:
        return None
    try:
        return datetime.fromisoformat(val)
    except Exception as e:
        print(f"ERROR: {e}")
        return None