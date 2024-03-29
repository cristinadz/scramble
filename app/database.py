from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings
# import psycopg2
# from psycopg2.extras import RealDictCursor
# import time

# SQLALCHEMY_DATABASE_URL = 'postgresql://<username>:<password>@<ip-address/hostname>/<database_name'
SQLALCHEMY_DATABASE_URL = 'postgresql://cristina:m7Dfn9NCq2CypbQPNuZpcREZtbpMXamr@dpg-cgj05l7dvk4lfi5u0k8g-a.oregon-postgres.render.com/scramble'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#Connection is established for straight SQL usage

# while True:
#     try:
#         conn = psycopg2.connect(host='localhost', database='fastapi', user='alanm', cursor_factory=RealDictCursor)

#         cursor = conn.cursor()
#         print("Dabase connection was succesful!")
#         break
#     except Exception as error:
#         print("Connecting to databse failed")
#         print("Error: ", error)
#         time.sleep(2)

        