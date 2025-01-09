import asyncio

from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn
import os
from fastapi.middleware.cors import CORSMiddleware


#https://api.2performant.com/feed/9824ba7f7.csv

app = FastAPI(
    title="Backend - Mobila Moldova",
    description="This is the backend api for mobila moldova",
    terms_of_service="https://mobilamoldova.ro",
    contact={
        "name": "Stefan",
        "url": "https://izdrail.com/",
        "email": "stefan@izdrail.com",
    }
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Specify allowed methods
    allow_headers=["*"],  # Specify allowed headers
    max_age=3600,  # Set max age in seconds

)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/")
async def root():
    return {"data": "Documentation is located at /docs "}

# Create the documents api router
# app.include_router(research_router, prefix="/v1/documents")
# app.include_router(products_router, prefix="/v1/products")
if __name__ == "__main__":
    # Create and run the event loop
    loop = asyncio.get_event_loop()
    loop.run_until_complete()