from django.contrib import admin
from .models import Employee

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'department', 'role', 'salary', 'join_date')
    search_fields = ('name', 'email', 'department', 'role')
    list_filter = ('department',)
