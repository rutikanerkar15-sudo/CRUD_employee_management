## Employee Management System (CRUD API)

A full-stack CRUD (Create, Read, Update, Delete) Employee Management System built with a Django REST Framework backend and a responsive Vanilla JavaScript, HTML, and CSS frontend[cite: 1, 2].

## 🚀 Features

* **Create Employee:** Add new employee records with fields for name, department, role, salary, and join date.
* **Read Employees:** Display a list of all stored employees dynamically in a styled table.
* **Update Employee:** Edit existing employee records with pre-filled values.
* **Delete Employee:** Remove employee entries with immediate UI and database synchronization.
* **REST API Testing:** Includes an integrated HTTP request collection (`api_tests.http`) for testing endpoints directly in VS Code[cite: 1, 5].

---
Live link : https://rutikanerkar15-sudo.github.io/CRUD_employee_management/
## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript ES6+ (Fetch API)[cite: 1, 2]
* **Backend:** Python, Django, Django REST Framework[cite: 1, 2]
* **Database:** SQLite (`db.sqlite3`)[cite: 1, 2]
* **API Testing:** VS Code REST Client extension (`api_tests.http`)[cite: 1, 5]

---

## 📁 Project Structure

```text
employee_project/
├── backend/                # Django project settings & configuration
├── employees/              # Django app (Models, Views, Serializers, URLs)
│   ├── migrations/         # Database migration files
│   ├── models.py           # Employee database schema[cite: 2]
│   ├── serializers.py      # REST Framework serializers[cite: 2]
│   ├── urls.py             # App-level API routing[cite: 2]
│   └── views.py            # API ViewSets logic[cite: 2]
├── frontend/               # User interface files[cite: 2]
│   ├── index.html          # Main application page[cite: 2]
│   ├── style.css           # Styling rules[cite: 2]
│   └── app.js              # DOM operations and Fetch API logic[cite: 2]
├── api_tests.http          # REST Client API test suite
├── db.sqlite3              # SQLite database file[cite: 2]
├── manage.py               # Django management script[cite: 2]
└── README.md               # Project documentation[cite: 1]
