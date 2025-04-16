from src.auth.authenticator import Authenticator
import unittest

class TestAuthenticator(unittest.TestCase):
    def setUp(self):
        self.authenticator = Authenticator()

    def test_register_user(self):
        email = "test@example.com"
        password = "securepassword"
        result = self.authenticator.register_user(email, password)
        self.assertTrue(result)

    def test_authenticate_user_success(self):
        email = "test@example.com"
        password = "securepassword"
        self.authenticator.register_user(email, password)
        result = self.authenticator.authenticate_user(email, password)
        self.assertTrue(result)

    def test_authenticate_user_failure(self):
        email = "test@example.com"
        password = "wrongpassword"
        self.authenticator.register_user(email, "securepassword")
        result = self.authenticator.authenticate_user(email, password)
        self.assertFalse(result)

if __name__ == '__main__':
    unittest.main()