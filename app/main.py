from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.router import router as router_api

app = FastAPI()

app.mount('/static', StaticFiles(directory='app/static'), 'static')

app.include_router(router_api)

# if __name__=="__main__":
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)