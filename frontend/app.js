const API_URL = "http://127.0.0.1:8000/api/employees/";

const form = document.getElementById("emp-form");
const tbody = document.getElementById("employee-tbody");
const formTitle = document.getElementById("form-title");
const cancelBtn = document.getElementById("cancel-btn");
const searchInput = document.getElementById("search-input");

let allEmployees = [];

// 1. Fetch & Display All Employees with Loading Indicator
async function getEmployees() {
  tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">⏳ Loading employees...</td></tr>`;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load data");
    
    allEmployees = await res.json();
    renderTable(allEmployees);
  } catch (err) {
    console.error("Error fetching data:", err);
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:red;">❌ Error loading employee data. Ensure backend is running.</td></tr>`;
  }
}

// Render Table Rows
function renderTable(data) {
  tbody.innerHTML = "";
  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No employee records found.</td></tr>`;
    return;
  }

  data.forEach(emp => {
    tbody.innerHTML += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.department}</td>
        <td>${emp.role}</td>
        <td>$${parseFloat(emp.salary).toLocaleString()}</td>
        <td>${emp.join_date}</td>
        <td>
          <button class="btn-edit" onclick="editEmployee(${emp.id}, '${emp.name}', '${emp.email}', '${emp.department}', '${emp.role}', ${emp.salary}, '${emp.join_date}')">Edit</button>
          <button class="btn-delete" onclick="deleteEmployee(${emp.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// 2. Search / Filter Feature
function filterEmployees() {
  const query = searchInput ? searchInput.value.toLowerCase() : "";
  const filtered = allEmployees.filter(emp => 
    emp.name.toLowerCase().includes(query) || 
    emp.department.toLowerCase().includes(query)
  );
  renderTable(filtered);
}

if (searchInput) {
  searchInput.addEventListener("input", filterEmployees);
}

// 3. Client-Side Table Sorting Feature
function sortTable(columnIndex) {
  allEmployees.sort((a, b) => {
    let valA = columnIndex === 0 ? a.name.toLowerCase() : a.department.toLowerCase();
    let valB = columnIndex === 0 ? b.name.toLowerCase() : b.department.toLowerCase();
    return valA.localeCompare(valB);
  });
  renderTable(allEmployees);
}

// 4. Create & Update Handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("emp-id").value;
  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    department: document.getElementById("department").value,
    role: document.getElementById("role").value,
    salary: document.getElementById("salary").value,
    join_date: document.getElementById("join_date").value,
  };

  const url = id ? `${API_URL}${id}/` : API_URL;
  const method = id ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      resetForm();
      getEmployees();
    } else {
      const errData = await res.json();
      alert("Validation Error: " + JSON.stringify(errData));
    }
  } catch (err) {
    console.error("Save error:", err);
  }
});

// 5. Pre-fill Form for Edit
function editEmployee(id, name, email, department, role, salary, join_date) {
  document.getElementById("emp-id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("department").value = department;
  document.getElementById("role").value = role;
  document.getElementById("salary").value = salary;
  document.getElementById("join_date").value = join_date;

  formTitle.textContent = "Edit Employee";
  cancelBtn.style.display = "inline-block";
}

// 6. Delete Employee Handler
async function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    try {
      const res = await fetch(`${API_URL}${id}/`, { method: "DELETE" });
      if (res.ok) getEmployees();
    } catch (err) {
      console.error("Delete error:", err);
    }
  }
}

function resetForm() {
  form.reset();
  document.getElementById("emp-id").value = "";
  formTitle.textContent = "Add New Employee";
  cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", resetForm);

// Initial Load
getEmployees();