from email import message
import email
from email.message import Message
from tkinter import E
import uvicorn  # Web Server
from fastapi import FastAPI, Form  # API routing
from pydantic import BaseModel  # Data modeling
import pickle  # Deserializar modelos pkl
# Handle Access-Control-Allow-Origin
from starlette.middleware.cors import CORSMiddleware
from typing import Optional, List
# ML Models
model = pickle.load(open('spam.pkl', 'rb'))
cv = pickle.load(open('vectorizer.pkl', 'rb'))

# Init app
app = FastAPI()

# Server config
origins = ['http://localhost:3000']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Models
class Email(BaseModel):
    text: str

# Routes
@app.get('/')
async def index():
    return{"text": "Spam Detector API"}


@app.post('/predict')
async def predict(email: Email):
    data = [email.text]
    vec = cv.transform(data).toarray()
    result = model.predict(vec)
    if result[0] == 0:
        return {"success": "true", "data": {
            "spam": False,
            "percentage": 50,
            "message": "Your email is not spam"
        }}
    else:
        return {"success": "true", "data": {
            "spam": True,
            "percentage": 20,
            "message": "Your email is spam"
        }}


if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)
