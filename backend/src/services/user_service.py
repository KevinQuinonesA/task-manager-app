from datetime import datetime
from bson.objectid import ObjectId

class UserService:
    def __init__(self, db):
        self.db = db
        self.collection = db["users"]

    def create(self, user_data):
        """Create a new user with provided data"""
        try:
            # Add timestamps
            user_data['created_at'] = datetime.utcnow().isoformat()
            user_data['updated_at'] = datetime.utcnow().isoformat()
            
            # Insert user
            result = self.collection.insert_one(user_data)
            
            # Get and return the created user
            return self.find_by_id(str(result.inserted_id))
        except Exception as e:
            print(f"Error creating user: {str(e)}")
            raise

    def find_by_email(self, email):
        """Find a user by email"""
        try:
            user = self.collection.find_one({"email": email})
            if user:
                user['_id'] = str(user['_id'])
            return user
        except Exception as e:
            print(f"Error finding user by email: {str(e)}")
            return None

    def find_by_id(self, user_id):
        """Find a user by ID"""
        try:
            if not ObjectId.is_valid(user_id):
                return None
                
            user = self.collection.find_one({"_id": ObjectId(user_id)})
            if user:
                user['_id'] = str(user['_id'])
            return user
        except Exception as e:
            print(f"Error finding user by ID: {str(e)}")
            return None

    def update(self, user_id, update_data):
        """Update a user"""
        try:
            update_data['updated_at'] = datetime.utcnow().isoformat()
            
            # Never update _id field
            if '_id' in update_data:
                del update_data['_id']
                
            result = self.collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": update_data}
            )
            
            if result.modified_count > 0:
                return self.find_by_id(user_id)
            return None
        except Exception as e:
            print(f"Error updating user: {str(e)}")
            raise
            
    def delete(self, user_id):
        """Delete a user"""
        try:
            result = self.collection.delete_one({"_id": ObjectId(user_id)})
            return result.deleted_count > 0
        except Exception as e:
            print(f"Error deleting user: {str(e)}")
            raise