from django.contrib import admin

from .models import Record, Habit


class RecordAdmin(admin.ModelAdmin):
    pass


class HabitAdmin(admin.ModelAdmin):
    pass


admin.site.register(Record, RecordAdmin)
admin.site.register(Habit, HabitAdmin)
