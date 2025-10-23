# models.py
from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    Id: int
    Username: slice
    FirstName: slice
    LastName: slice
    Email: slice
    PhoneNumber: slice
    CreatedDate: datetime
    ConfirmedEmail: bool
    TwoFactor: bool
    LastLogin: datetime
    IsDemo: bool
    AdminLevel: int
    IsAdmin: bool

def data_to_model(data):
    if not data:
        return None
    return User(
        Id=data['Id'],
        Username=data['Username'],
        FirstName=data['FirstName'],
        LastName=data['LastName'],
        Email=data['Email'],
        PhoneNumber=data['PhoneNumber'],
        CreatedDate=data['CreatedDate'],
        ConfirmedEmail=bool(data['ConfirmedEmail']),
        TwoFactor=bool(data['TwoFactor']),
        LastLogin=data['LastLogin'],
        IsDemo=bool(data['IsDemo']),
        AdminLevel=data['AdminLevel'],
        IsAdmin=bool(data['IsAdmin'])
    )