FROM python:3.13
WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
COPY . /app

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

CMD ["fastapi", "run", "app/main.py", "--port", "8000"]










