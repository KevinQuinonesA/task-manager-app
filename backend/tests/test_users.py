import unittest
from src.auth.authenticator import Authenticator
from src.services.user_service import UserService

class TestUserService(unittest.TestCase):

    def setUp(self):
        self.authenticator = Authenticator()
        self.user_service = UserService()

    def test_register_user(self):
        email = "test@example.com"
        password = "securepassword"
        result = self.user_service.register_user(email, password)
        self.assertTrue(result)

    def test_authenticate_user(self):
        email = "test@example.com"
        password = "securepassword"
        self.user_service.register_user(email, password)
        result = self.user_service.authenticate_user(email, password)
        self.assertTrue(result)

    def test_authenticate_user_invalid(self):
        email = "invalid@example.com"
        password = "wrongpassword"
        result = self.user_service.authenticate_user(email, password)
        self.assertFalse(result)

if __name__ == '__main__':
    unittest.main()