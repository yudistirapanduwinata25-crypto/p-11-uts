// ========================================
// EDUTRACK - MAIN JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    initializeIcons();
    initializeDate();
    initializeSidebar();
    initializeTheme();
    initializeDashboard();
    initializeSchedule();
    initializeGrades();
    initializeTasks();
});

// ========================================
// ICON
// ========================================

function initializeIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// ========================================
// TANGGAL
// ========================================

function initializeDate() {
    const dateElement = document.getElementById("currentDate");

    if (dateElement) {
        const today = new Date();

        dateElement.textContent = today.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
}

// ========================================
// SIDEBAR MOBILE
// ========================================

function initializeSidebar() {
    const menuButton = document.getElementById("mobileMenu");
    const sidebar = document.getElementById("sidebar");

    if (menuButton && sidebar) {
        menuButton.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });

        document.addEventListener("click", function (event) {
            if (
                window.innerWidth <= 800 &&
                !sidebar.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                sidebar.classList.remove("open");
            }
        });
    }
}

// ========================================
// MODE GELAP
// ========================================

function initializeTheme() {
    const themeButton = document.getElementById("themeToggle");

    if (localStorage.getItem("edutrack-theme") === "dark") {
        document.body.classList.add("dark-mode");
        updateThemeButton();
    }

    if (themeButton) {
        themeButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            const darkMode = document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "edutrack-theme",
                darkMode ? "dark" : "light"
            );

            updateThemeButton();

            if (window.academicChartInstance) {
                window.academicChartInstance.update();
            }

            if (window.gradeChartInstance) {
                window.gradeChartInstance.update();
            }
        });
    }
}

function updateThemeButton() {
    const themeButton = document.getElementById("themeToggle");

    if (!themeButton) return;

    const darkMode = document.body.classList.contains("dark-mode");

    themeButton.innerHTML = darkMode
        ? '<i data-lucide="sun"></i><span>Mode terang</span>'
        : '<i data-lucide="moon"></i><span>Mode gelap</span>';

    initializeIcons();
}

// ========================================
// DATA TUGAS
// ========================================

const defaultTasks = [
    {
        id: 1,
        name: "Membuat desain UI aplikasi",
        course: "Pemrograman Web",
        date: "2026-11-02",
        description: "Membuat rancangan tampilan aplikasi menggunakan Figma.",
        done: false
    },
    {
        id: 2,
        name: "Laporan analisis kebutuhan sistem",
        course: "Rekayasa Perangkat Lunak",
        date: "2026-11-04",
        description: "Menyusun laporan analisis kebutuhan sistem.",
        done: false
    },
    {
        id: 3,
        name: "Latihan query dan normalisasi",
        course: "Basis Data",
        date: "2026-11-06",
        description: "Mengerjakan latihan SQL dan normalisasi database.",
        done: false
    },
    {
        id: 4,
        name: "Rangkuman materi pertemuan 8",
        course: "Manajemen Proyek TI",
        date: "2026-11-08",
        description: "Membuat rangkuman materi perkuliahan.",
        done: false
    },
    {
        id: 5,
        name: "Presentasi kelompok",
        course: "Analisis Sistem Informasi",
        date: "2026-10-27",
        description: "Mempresentasikan hasil diskusi kelompok.",
        done: true
    }
];

function getTasks() {
    const savedTasks = localStorage.getItem("edutrack-tasks");

    if (savedTasks) {
        try {
            return JSON.parse(savedTasks);
        } catch (error) {
            return [...defaultTasks];
        }
    }

    localStorage.setItem(
        "edutrack-tasks",
        JSON.stringify(defaultTasks)
    );

    return [...defaultTasks];
}

function saveTasks(tasks) {
    localStorage.setItem(
        "edutrack-tasks",
        JSON.stringify(tasks)
    );
}

// ========================================
// DASHBOARD
// ========================================

function initializeDashboard() {
    const taskContainer = document.getElementById("dashboardTaskList");

    if (taskContainer) {
        renderDashboardTasks();
    }

    const chartElement = document.getElementById("academicChart");

    if (chartElement && window.Chart) {
        const context = chartElement.getContext("2d");

        window.academicChartInstance = new Chart(context, {
            type: "line",
            data: {
                labels: [
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober"
                ],
                datasets: [{
                    label: "Indeks Prestasi",
                    data: [3.30, 3.45, 3.40, 3.60, 3.65, 3.75],
                    borderColor: "#78845e",
                    backgroundColor: "rgba(120,132,94,0.12)",
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2.5,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    pointBackgroundColor: "#78845e"
                }]
            },
            options: chartOptions(4)
        });
    }
}

function renderDashboardTasks() {
    const container = document.getElementById("dashboardTaskList");

    if (!container) return;

    const tasks = getTasks();
    const pending = tasks.filter(task => !task.done);
    const upcoming = pending
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 4);

    if (upcoming.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="check-circle-2"></i>
                Semua tugas sudah selesai.
            </div>
        `;
    } else {
        container.innerHTML = upcoming.map(task => `
            <div class="dashboard-task">
                <span class="task-dot"></span>
                <div class="dashboard-task-info">
                    <strong>${escapeHTML(task.name)}</strong>
                    <span>${escapeHTML(task.course)}</span>
                </div>
                <span class="task-date">${formatDate(task.date)}</span>
            </div>
        `).join("");
    }

    updateDashboardStats(tasks);
    initializeIcons();
}

function updateDashboardStats(tasks) {
    const total = tasks.length;
    const done = tasks.filter(task => task.done).length;
    const pending = total - done;
    const percentage = total === 0
        ? 0
        : Math.round((done / total) * 100);

    const totalElement = document.getElementById("totalTasks");
    const pendingElement = document.getElementById("pendingTasks");
    const percentageElement = document.getElementById("completionRate");
    const progressElement = document.getElementById("completionBar");

    if (totalElement) totalElement.textContent = total;
    if (pendingElement) pendingElement.textContent = pending + " belum selesai";
    if (percentageElement) percentageElement.textContent = percentage + "%";
    if (progressElement) progressElement.style.width = percentage + "%";
}

// ========================================
// JADWAL KULIAH
// ========================================

const scheduleData = {
    Senin: [
        {
            time: "08:00",
            end: "09:40",
            name: "Pemrograman Web",
            lecturer: "Pak Andi",
            room: "Lab 02",
            color: ""
        },
        {
            time: "10:00",
            end: "11:40",
            name: "Basis Data",
            lecturer: "Bu Rina",
            room: "B-203",
            color: "sand-indicator"
        },
        {
            time: "13:00",
            end: "14:40",
            name: "Rekayasa Perangkat Lunak",
            lecturer: "Pak Dimas",
            room: "A-105",
            color: "dark-indicator"
        }
    ],

    Selasa: [
        {
            time: "08:00",
            end: "09:40",
            name: "Analisis Sistem Informasi",
            lecturer: "Bu Sari",
            room: "A-102",
            color: ""
        },
        {
            time: "10:00",
            end: "11:40",
            name: "Manajemen Proyek TI",
            lecturer: "Pak Budi",
            room: "B-201",
            color: "sand-indicator"
        }
    ],

    Rabu: [
        {
            time: "09:00",
            end: "10:40",
            name: "Interaksi Manusia Komputer",
            lecturer: "Bu Maya",
            room: "Lab 01",
            color: ""
        },
        {
            time: "13:00",
            end: "14:40",
            name: "Komunikasi Data",
            lecturer: "Pak Rudi",
            room: "A-203",
            color: "dark-indicator"
        }
    ],

    Kamis: [
        {
            time: "08:00",
            end: "09:40",
            name: "Pemrograman Mobile",
            lecturer: "Pak Arif",
            room: "Lab 03",
            color: ""
        },
        {
            time: "10:00",
            end: "11:40",
            name: "Statistika",
            lecturer: "Bu Lina",
            room: "B-204",
            color: "sand-indicator"
        }
    ],

    Jumat: [
        {
            time: "08:00",
            end: "09:40",
            name: "Etika Profesi",
            lecturer: "Pak Hendra",
            room: "A-101",
            color: ""
        }
    ]
};

function initializeSchedule() {
    const tabs = document.querySelectorAll(".day-tab");
    const container = document.getElementById("scheduleContainer");

    if (!container || tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            renderSchedule(this.dataset.day);
        });
    });

    renderSchedule("Senin");
}

function renderSchedule(day) {
    const container = document.getElementById("scheduleContainer");

    if (!container) return;

    const schedules = scheduleData[day] || [];

    if (schedules.length === 0) {
        container.innerHTML = `
            <div class="schedule-empty">
                <i data-lucide="calendar-check"></i>
                <p>Tidak ada jadwal kuliah pada hari ${day}.</p>
            </div>
        `;
        initializeIcons();
        return;
    }

    container.innerHTML = schedules.map(item => `
        <div class="schedule-item">
            <div class="schedule-time">
                <strong>${item.time}</strong>
                <span>${item.end}</span>
            </div>
            <div class="schedule-indicator ${item.color}"></div>
            <div class="schedule-info">
                <strong>${escapeHTML(item.name)}</strong>
                <span>${escapeHTML(item.room)} · ${escapeHTML(item.lecturer)}</span>
            </div>
            <span class="schedule-room">${escapeHTML(item.room)}</span>
        </div>
    `).join("");
}

// ========================================
// GRAFIK NILAI
// ========================================

function initializeGrades() {
    const chartElement = document.getElementById("gradeChart");

    if (!chartElement || !window.Chart) return;

    window.gradeChartInstance = new Chart(chartElement, {
        type: "bar",
        data: {
            labels: [
                "Semester 1",
                "Semester 2",
                "Semester 3",
                "Semester 4",
                "Semester 5",
                "Semester 6"
            ],
            datasets: [{
                label: "IP Semester",
                data: [3.20, 3.35, 3.45, 3.55, 3.65, 3.75],
                backgroundColor: [
                    "#d9dfca",
                    "#cbd3b7",
                    "#b9c49f",
                    "#a4b18a",
                    "#89986c",
                    "#68784e"
                ],
                borderRadius: 7,
                maxBarThickness: 35
            }]
        },
        options: chartOptions(4)
    });
}

function chartOptions(maximum) {
    const darkMode = document.body.classList.contains("dark-mode");

    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: darkMode ? "#30372a" : "#30372a",
                padding: 11,
                titleFont: {
                    family: "DM Sans"
                },
                bodyFont: {
                    family: "DM Sans"
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: darkMode ? "#a2a696" : "#92958a",
                    font: {
                        family: "DM Sans",
                        size: 10
                    }
                },
                border: {
                    display: false
                }
            },
            y: {
                min: 0,
                max: maximum,
                ticks: {
                    stepSize: 1,
                    color: darkMode ? "#a2a696" : "#92958a",
                    font: {
                        family: "DM Sans",
                        size: 10
                    }
                },
                grid: {
                    color: darkMode ? "#363d32" : "#eeefe8"
                },
                border: {
                    display: false
                }
            }
        }
    };
}

// ========================================
// MANAJEMEN TUGAS
// ========================================

function initializeTasks() {
    const taskList = document.getElementById("taskList");

    if (!taskList) return;

    const addButton = document.getElementById("addTaskButton");
    const closeButton = document.getElementById("closeModal");
    const cancelButton = document.getElementById("cancelModal");
    const modal = document.getElementById("taskModal");
    const form = document.getElementById("taskForm");
    const search = document.getElementById("taskSearch");
    const filter = document.getElementById("taskFilter");

    addButton.addEventListener("click", openAddModal);
    closeButton.addEventListener("click", closeTaskModal);
    cancelButton.addEventListener("click", closeTaskModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeTaskModal();
        }
    });

    form.addEventListener("submit", saveTaskForm);

    search.addEventListener("input", renderTaskList);
    filter.addEventListener("change", renderTaskList);

    renderTaskList();
}

function openAddModal() {
    const form = document.getElementById("taskForm");

    form.reset();

    document.getElementById("taskId").value = "";
    document.getElementById("modalTitle").textContent = "Tambah tugas baru";
    document.getElementById("taskDate").value = "";

    document.getElementById("taskModal").classList.add("show");
}

function closeTaskModal() {
    document.getElementById("taskModal").classList.remove("show");
}

function saveTaskForm(event) {
    event.preventDefault();

    const id = document.getElementById("taskId").value;
    const name = document.getElementById("taskName").value.trim();
    const course = document.getElementById("taskCourse").value.trim();
    const date = document.getElementById("taskDate").value;
    const description = document.getElementById("taskDescription").value.trim();

    if (!name || !course || !date) {
        alert("Lengkapi nama tugas, mata kuliah, dan deadline.");
        return;
    }

    const tasks = getTasks();

    if (id) {
        const index = tasks.findIndex(task => String(task.id) === String(id));

        if (index !== -1) {
            tasks[index].name = name;
            tasks[index].course = course;
            tasks[index].date = date;
            tasks[index].description = description;
        }
    } else {
        tasks.push({
            id: Date.now(),
            name,
            course,
            date,
            description,
            done: false
        });
    }

    saveTasks(tasks);
    closeTaskModal();
    renderTaskList();
}

function renderTaskList() {
    const container = document.getElementById("taskList");

    if (!container) return;

    const tasks = getTasks();
    const searchValue = (
        document.getElementById("taskSearch")?.value || ""
    ).toLowerCase();

    const filterValue = (
        document.getElementById("taskFilter")?.value || "all"
    );

    const filteredTasks = tasks.filter(task => {
        const matchesSearch =
            task.name.toLowerCase().includes(searchValue) ||
            task.course.toLowerCase().includes(searchValue);

        const matchesFilter =
            filterValue === "all" ||
            (filterValue === "done" && task.done) ||
            (filterValue === "pending" && !task.done);

        return matchesSearch && matchesFilter;
    });

    if (filteredTasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="clipboard-list"></i>
                Tidak ada tugas yang ditemukan.
            </div>
        `;
    } else {
        container.innerHTML = filteredTasks
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(task => `
                <div class="task-row ${task.done ? "is-done" : ""}">
                    <input
                        type="checkbox"
                        class="task-check"
                        ${task.done ? "checked" : ""}
                        onchange="toggleTask(${task.id})"
                        aria-label="Tandai tugas selesai"
                    >

                    <div class="task-main">
                        <strong>${escapeHTML(task.name)}</strong>
                        <span>${escapeHTML(task.course)}</span>
                        ${
                            task.description
                                ? `<span class="task-description">${escapeHTML(task.description)}</span>`
                                : ""
                        }
                    </div>

                    <span class="task-deadline">${formatDate(task.date)}</span>

                    <div class="task-actions">
                        <button class="small-action" onclick="editTask(${task.id})" title="Edit tugas">
                            <i data-lucide="pencil"></i>
                        </button>
                        <button class="small-action" onclick="deleteTask(${task.id})" title="Hapus tugas">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
            `).join("");
    }

    updateTaskStatistics(tasks);
    initializeIcons();
}

function updateTaskStatistics(tasks) {
    const total = tasks.length;
    const done = tasks.filter(task => task.done).length;
    const pending = total - done;
    const percentage = total === 0
        ? 0
        : Math.round((done / total) * 100);

    document.getElementById("taskTotal").textContent = total;
    document.getElementById("taskPending").textContent = pending;
    document.getElementById("taskDone").textContent = done;
    document.getElementById("taskPercent").textContent = percentage + "%";
}

function toggleTask(id) {
    const tasks = getTasks();

    const task = tasks.find(item => String(item.id) === String(id));

    if (!task) return;

    task.done = !task.done;

    saveTasks(tasks);
    renderTaskList();
}

function editTask(id) {
    const tasks = getTasks();
    const task = tasks.find(item => String(item.id) === String(id));

    if (!task) return;

    document.getElementById("taskId").value = task.id;
    document.getElementById("taskName").value = task.name;
    document.getElementById("taskCourse").value = task.course;
    document.getElementById("taskDate").value = task.date;
    document.getElementById("taskDescription").value = task.description || "";

    document.getElementById("modalTitle").textContent = "Edit tugas";
    document.getElementById("taskModal").classList.add("show");
}

function deleteTask(id) {
    const confirmation = confirm("Apakah kamu yakin ingin menghapus tugas ini?");

    if (!confirmation) return;

    const tasks = getTasks().filter(
        task => String(task.id) !== String(id)
    );

    saveTasks(tasks);
    renderTaskList();
}

// ========================================
// HELPER
// ========================================

function formatDate(dateString) {
    if (!dateString) return "-";

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}