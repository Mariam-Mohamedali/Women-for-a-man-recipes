# 🍽️ Women For A Man — Premium Recipe Platform

<p align="center">
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/Glassmorphism-A020F0?style=for-the-badge&logo=css3&logoColor=white" />
</p>

---

## 🌟 Overview

**Women For A Man** is a sophisticated, high-end recipe management platform built with **Django**. It combines a premium **Glassmorphic UI** with a robust backend to provide users with a seamless experience for discovering, sharing, and managing Middle Eastern and international culinary delights.

Originally a static frontend project, this version has been fully migrated to a dynamic Django architecture, featuring real-time search, user authentication, and secure data persistence.

---

## ✨ Premium Features

- 💎 **Glassmorphic Design** — A modern, semi-transparent UI with vibrant gradients and smooth micro-interactions.
- 🔍 **AJAX Real-Time Search** — Instant recipe filtering without page reloads for a fluid browsing experience.
- 🔐 **Secure Authentication** — Full User registration, login, and profile management systems.
- ❤️ **Dynamic Favourites** — Heart recipes and manage your personal collection via asynchronous AJAX updates.
- 🛠️ **Recipe Management** — Create, edit, and delete your own recipes with a rich, intuitive form interface.
- 🛡️ **Advanced Admin Panel** — A dedicated dashboard for managing users and moderating content.
- 📱 **Fully Responsive** — Meticulously optimized for everything from mobile phones to ultra-wide monitors.
- 🔔 **Premium Notifications** — Custom-built glassmorphic toast notifications for all user actions.

---

## 🏗️ Project Structure (Django Architecture)

The project follows a standard Django structure, modularized for scalability and maintainability:

```text
Women-for-a-man-recipes/
│
├── recipe_project/          # Project Configuration
│   ├── settings.py          # Global settings (DB, Static, Media)
│   ├── urls.py              # Main URL routing
│   └── wsgi.py              # Deployment config
│
├── main/                    # Core Application Logic
│   ├── models.py            # Database schemas (Recipes, Categories, Favourites)
│   ├── views.py             # Business logic & AJAX handlers
│   ├── urls.py              # App-specific routing
│   ├── forms.py             # Django forms for Recipes & Auth
│   ├── admin.py             # Admin interface registration
│   │
│   ├── templates/main/      # HTML Templates (Jinja2/Django Template Language)
│   │   ├── base.html        # Master layout with shared Nav/Footer
│   │   ├── recipes.html     # Main recipe gallery
│   │   ├── recipe_detail.html # Single recipe view
│   │   └── ...              # Auth, Profile, and Admin templates
│   │
│   └── static/main/         # Frontend Assets
│       ├── css/             # Modularized Vanilla CSS files
│       ├── js/              # AJAX & UI interaction logic
│       └── images/          # UI icons and static assets
│
├── media/                   # User-uploaded recipe images
├── manage.py                # Django CLI tool
└── db.sqlite3               # Local development database
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Python 3.x, Django 4.2+ |
| **Database** | SQLite (Development), PostgreSQL (Production Ready) |
| **Frontend** | HTML5, CSS3 (Custom Variables), Vanilla JavaScript |
| **Interactions** | AJAX / Fetch API (for real-time updates) |
| **Icons & Fonts** | Font Awesome 6, Google Fonts (Outfit, Inter) |

---

## 🚀 Getting Started

### 📋 Prerequisites

- Python 3.10 or higher
- `pip` (Python package manager)
- `virtualenv` (Recommended)

### ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mariam-Mohamedali/Women-for-a-man-recipes.git
   cd Women-for-a-man-recipes
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install django pillow
   ```

4. **Apply Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a Superuser (Admin)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the Development Server**
   ```bash
   python manage.py runserver
   ```

Visit `http://127.0.0.1:8000/` in your browser to explore the platform!

---

## 📄 Key Pages

- **Home**: Welcome screen with featured highlights.
- **Recipe Gallery**: Filterable list of all recipes with AJAX search.
- **Detail Page**: Comprehensive view of ingredients and instructions.
- **User Profile**: Manage your identity and see your "loved" recipes.
- **Add/Edit**: Simple but powerful forms for content creators.
- **User Management**: (Admin Only) View and manage the community.

---

## 🤝 Contributing

We love contributions!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 👩‍💻 The Dream Team

> *"Behind every great recipe is a story of friendship and passion."*

- **✨ Mariam Mohamedali** (Project Lead) — [![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github)](https://github.com/Mariam-Mohamedali)
- Saged Amr
- Shaza Mosad
- Angham Maher
- Dima Adel
- Esraa Hosni

---





---

<p align="center">
  Built with ☕ and ❤️ by the <b>Women For A Man</b> Team.
</p>
