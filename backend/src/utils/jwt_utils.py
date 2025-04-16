import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DEFAULT_SECRET = "default-secret-key-for-development-only"
JWT_SECRET = os.getenv('JWT_SECRET', DEFAULT_SECRET)
JWT_EXPIRATION_HOURS = int(os.getenv('JWT_EXPIRATION_HOURS', 24))

def generate_jwt(user_id):
    """Generate a JWT token for authentication"""
    payload = {
        'sub': str(user_id),
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

def verify_jwt(token):
    """Verify a JWT token and return the user ID if valid"""
    try:
        # Remove 'Bearer ' prefix if present
        if token and token.startswith('Bearer '):
            token = token[7:]
            
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return payload['sub']  # user_id
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")
    except Exception as e:
        raise ValueError(f"Token verification error: {str(e)}")

def extract_token_from_event(event):
    """Extract JWT token from API Gateway event"""
    headers = event.get('headers', {})
    
    # Try to get from Authorization header first
    auth_header = headers.get('Authorization') or headers.get('authorization')
    if auth_header and auth_header.startswith('Bearer '):
        return auth_header[7:]
        
    # Try to get from query parameters
    query_params = event.get('queryStringParameters', {}) or {}
    token = query_params.get('token')
    if token:
        return token
        
    return None