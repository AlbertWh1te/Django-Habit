from rest_framework import serializers
from .models import Record, Habit


class RecordSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Record.objects.create(
            habit=validated_data["habit"], account=self.context["request"].user
        )

    class Meta:
        model = Record
        fields = "__all__"
        read_only_fields = ["update_time", "create_time", "account"]


class HabitSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Habit.objects.create(
            account=self.context["request"].user, name=validated_data["name"]
        )

    class Meta:
        model = Habit
        fields = "__all__"
        read_only_fields = [
            "update_time",
            "create_time",
            "account",
            "totall_times",
            "current_times",
        ]
