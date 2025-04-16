import json
from src.auth.authenticator import Authenticator
from src.utils.jwt_utils import generate_jwt
from src.utils.db_connector import connect_to_db
from src.services.user_service import UserService

# Standard headers for CORS
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": True,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,access-control-allow-credentials"
}

def register_user(event, context):
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        name = body.get('name')
        email = body.get('email')
        password = body.get('password')
        
        # Initialize dependencies
        db = connect_to_db()
        user_service = UserService(db)
        authenticator = Authenticator(user_service)
        
        try:
            # Register user
            user = authenticator.register_user(name, email, password)
            
            # Generate JWT token
            token = generate_jwt(user['_id'])
            
            return {
                'statusCode': 201,
                'headers': CORS_HEADERS,
                'body': json.dumps({
                    'message': 'User registered successfully',
                    'user_id': user['_id'],
                    'token': token,
                    'name': user.get('name', ''),
                    'email': user.get('email', ''),
                })
            }
        except ValueError as e:
            return {
                'statusCode': 400,
                'headers': CORS_HEADERS,
                'body': json.dumps({'message': str(e)})
            }
            
    except Exception as e:
        print(f"Error in register_user: {str(e)}")
        return {
            'statusCode': 500,
            'headers': CORS_HEADERS,
            'body': json.dumps({'message': f'Server error: {str(e)}'})
        }

def authenticate_user(event, context):
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        email = body.get('email')
        password = body.get('password')
        
        # Initialize dependencies
        db = connect_to_db()
        user_service = UserService(db)
        authenticator = Authenticator(user_service)
        
        # Authenticate user
        user = authenticator.authenticate_user(email, password)
        
        if user:
            # Generate JWT token
            token = generate_jwt(user['_id'])
            
            return {
                'statusCode': 200,
                'headers': CORS_HEADERS,
                'body': json.dumps({
                    'message': 'Authentication successful',
                    'user_id': user['_id'],
                    'token': token,
                    'name': user.get('name', ''),
                    'email': user.get('email', ''),
                })
            }
        else:
            return {
                'statusCode': 401,
                'headers': CORS_HEADERS,
                'body': json.dumps({'message': 'Invalid email or password'})
            }
            
    except Exception as e:
        print(f"Error in authenticate_user: {str(e)}")
        return {
            'statusCode': 500,
            'headers': CORS_HEADERS,
            'body': json.dumps({'message': f'Server error: {str(e)}'})
        }