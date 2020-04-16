import json
from django.contrib.auth.models import User
from django.test import TestCase
from .models import Record, Habit

HABIT_NUMBER = 20
RECROD_NUMBER = 300


class HabitTest(TestCase):
    def setUp(self):
        self.access_token = None
        self.set_up_user()
        self.set_up_habits()
        self.set_up_records()

    def set_up_user(self):
        self.credentials = {"username": "testuser", "password": "secret"}
        self.user = User.objects.create_user(**self.credentials)

    def set_up_habits(self):
        self.habits_list = [
            Habit.objects.create(name=f"Habits-{x}", account=self.user)
            for x in range(HABIT_NUMBER)
        ]

    def set_up_records(self):
        self.records_list = [
            Record.objects.create(habit=habit, account=self.user)
            for habit in self.habits_list
            for _ in range(RECROD_NUMBER)
        ]

    def generate_access_token(self):
        response = self.client.post("/api/token/", self.credentials, follow=True)
        self.access_token = json.loads(response.content)["access"]

    def add_jwt_token(self):
        self.generate_access_token()
        self.client.defaults["HTTP_AUTHORIZATION"] = "Bearer " + self.access_token

    def clearn_jwt_token(self):
        self.client.defaults["HTTP_AUTHORIZATION"] = ""

    def test_login_suceess(self):
        # send login data
        response = self.client.post("/api/token/", self.credentials, follow=True)
        self.assertEqual(response.status_code, 200)

        self.access_token = json.loads(response.content)["access"]

    def test_login_fail(self):
        test_credentials = {"username": "testuser", "password": "testword"}
        response = self.client.post("/api/token/", test_credentials, follow=True)
        # HTTP 401: Unauthorized
        self.assertEqual(response.status_code, 401)

    def test_create_user_habit(self):
        test_data = {"name": "test1"}
        self.add_jwt_token()
        response = self.client.post("/api/habit/", test_data, format="json")
        # HTTP 201: Created
        self.assertEqual(response.status_code, 201)
        # check totall number
        response = self.client.get("/api/habit/", format="json")
        self.assertEqual(response.json()["count"], HABIT_NUMBER + 1)

    def test_create_user_record(self):
        test_data = {"habit": 1}
        self.add_jwt_token()
        response = self.client.post("/api/record/", test_data, format="json")
        # HTTP 201: Created
        self.assertEqual(response.status_code, 201)
        # check totall number
        response = self.client.get("/api/record/", format="json")
        self.assertEqual(response.json()["count"], HABIT_NUMBER * RECROD_NUMBER + 1)

    def test_get_user_habit(self):
        # check create habits in db success
        assert len(self.habits_list) == HABIT_NUMBER

        self.clearn_jwt_token()
        response = self.client.get("/api/habit/", format="json")
        # HTTP 401: Unauthorized
        self.assertEqual(response.status_code, 401)

        self.add_jwt_token()
        response = self.client.get("/api/habit/", format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["count"], HABIT_NUMBER)

    def test_get_user_record(self):
        # check create records in db success
        assert len(self.records_list) == HABIT_NUMBER * RECROD_NUMBER

        self.clearn_jwt_token()
        response = self.client.get("/api/record/", format="json")
        self.assertEqual(response.status_code, 401)

        self.add_jwt_token()
        response = self.client.get("/api/record/", format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["count"], HABIT_NUMBER * RECROD_NUMBER)
