# You can create a test_connection.py file
from src.utils.db_connector import connect_to_db

def test_connection():
    try:
        db = connect_to_db()
        print("Successfully connected to MongoDB Atlas!")
        # List collections to verify connection
        print("Collections:", db.list_collection_names())
        return True
    except Exception as e:
        print(f"Connection failed: {e}")
        return False

if __name__ == "__main__":
    test_connection()