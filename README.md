# 🍽️ Women For A Man — Recipe Website

> A beautifully crafted, fully responsive recipe website built with pure HTML, CSS, and JavaScript. Discover, search, and save your favourite Middle Eastern and international recipes — from breakfast to dessert.

---

## 📸 Preview

| Page | Description |
|------|-------------|
| **Home** | Hero banner, callout section, and community highlights |
| **Our Recipes** | Category browser with global search |
| **Recipe Details** | Full recipe view with ingredients and steps |
| **Profile** | Personal saved recipes and account info |
| **Admin Dashboard** | Manage and moderate all recipes |

---

## ✨ Features

- 🔍 **Global Search** — Search any recipe by name or ingredient and jump directly to its details page
- 📂 **4 Meal Categories** — Browse Breakfast, Lunch, Dinner, and Dessert independently
- 👤 **User Authentication** — Register, log in, and maintain a personal profile
- ❤️ **Save Favourites** — Save recipes to your personal list when logged in
- ➕ **Add & Edit Recipes** — Registered users can contribute and manage recipes
- 🛡️ **Admin Dashboard** — Dedicated panel for content moderation
- 📱 **Fully Responsive** — Optimised for mobile, tablet, and desktop screens
- 🎨 **Modern UI** — Glassmorphism effects, smooth animations, and a consistent design system

---

## 🗂️ Project Structure

```
Women-for-a-man-recipes/
│
├── home.html               # Landing page
├── ourRecipes.html         # Recipe categories & search
├── recipeDetails.html      # Single recipe view
├── breakfastRecipes.html   # Breakfast category
├── lunchRecipes.html       # Lunch category
├── dinnerRecipes.html      # Dinner category
├── dessertRecipes.html     # Dessert category
├── login.html              # User login
├── register.html           # User registration
├── profilePage.html        # User profile & saved recipes
├── addRecipe.html          # Add a new recipe (auth required)
├── editRecipe.html         # Edit an existing recipe (auth required)
├── adminDashboard.html     # Admin control panel
├── aboutUs.html            # About the team
├── contactUs.html          # Contact form
│
└── assets/
    ├── css/
    │   ├── root.css            # Global design tokens & variables
    │   ├── navbar.css          # Navigation bar styles
    │   ├── home.css            # Home page styles
    │   ├── ourRecipes.css      # Recipe categories page styles
    │   ├── recipeCards.css     # Reusable recipe card component
    │   ├── recipeDetails.css   # Recipe detail page styles
    │   ├── login.css           # Login & register shared styles
    │   ├── register.css        # Registration page styles
    │   ├── profile.css         # Profile page styles
    │   ├── admin.css           # Admin dashboard styles
    │   ├── aboutUs.css         # About Us page styles
    │   └── contactUs.css       # Contact Us page styles
    │
    ├── js/
    │   ├── recipes.js          # Core recipe data & storage logic
    │   ├── auth.js             # Authentication (login/register/logout)
    │   ├── navbar.js           # Dynamic navbar rendering
    │   ├── hero.js             # Home page hero & animations
    │   ├── ourRecipes.js       # Search & category logic
    │   ├── recipeDetails.js    # Single recipe rendering
    │   ├── recipeUI.js         # Shared recipe card UI helpers
    │   ├── addRecipe.js        # Add recipe form logic
    │   ├── editRecipe.js       # Edit recipe form logic
    │   ├── profilePage.js      # Profile & favourites logic
    │   ├── adminDashboard.js   # Admin panel logic
    │   ├── login.js            # Login form handler
    │   ├── register.js         # Registration form handler
    │   └── toast.js            # Toast notification utility
    │
    └── images/                 # Local recipe and UI images
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic page structure |
| **CSS3** | Styling, animations, responsive layout |
| **Vanilla JavaScript** | Logic, DOM manipulation, localStorage |
| **localStorage** | Client-side data persistence (recipes, users, sessions) |
| **Font Awesome** | Icons (social links, UI elements) |
| **Google Fonts** | Modern, clean typography |

> ⚠️ This project is entirely front-end — no back-end server or database is required. All data is stored in the browser's `localStorage`.

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- No installation, build step, or server required

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mariam-Mohamedali/Women-for-a-man-recipes.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd Women-for-a-man-recipes
   ```

3. **Open in your browser**

   Simply open `home.html` in any web browser:
   ```bash
   # On Windows
   start home.html

   # On macOS
   open home.html

   # On Linux
   xdg-open home.html
   ```

   > **Tip:** For the best experience, use the **Live Server** extension in VS Code to avoid any path-related issues with local images.

---

## 📄 Pages Overview

### 🏠 Home (`home.html`)
The landing page featuring a welcoming hero image, a callout banner encouraging users to explore all recipes, and a "Why Join?" section highlighting key features.

### 🍴 Our Recipes (`ourRecipes.html`)
Displays all four meal categories as visual cards. Includes a global search bar that redirects users directly to the matching recipe's detail page.

### 📖 Recipe Details (`recipeDetails.html`)
Shows the full details of a selected recipe — image, ingredients, steps, and a back button to return to the previous page.

### 👤 Profile (`profilePage.html`)
A personalised dashboard where logged-in users can view their account information and manage their saved/favourited recipes.

### ➕ Add / Edit Recipe
Authenticated users can submit new recipes via `addRecipe.html` and modify existing ones via `editRecipe.html`.

### 🛡️ Admin Dashboard (`adminDashboard.html`)
A protected panel for administrators to view and manage all recipes added by users across the platform.

### ℹ️ About Us (`aboutUs.html`)
Information about the team behind Women For A Man.

### 📬 Contact Us (`contactUs.html`)
A contact form for users to reach out, alongside email and phone information.

---

## 🔐 Authentication Flow

1. New users **register** at `register.html` — credentials are stored in `localStorage`.
2. Users **log in** at `login.html` — a session is maintained via `localStorage`.
3. The **navbar** dynamically adapts based on authentication state, showing/hiding relevant links.
4. **Logout** clears the session and redirects to the home page.

---

## 📱 Responsive Design

The website is built mobile-first and tested across multiple screen sizes:

- **Mobile** — `< 480px`
- **Tablet** — `481px – 768px`
- **Desktop** — `> 769px`

---

## 🤝 Contributing

Contributions are welcome! If you have a suggestion or find a bug, feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: your feature description"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📃 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👩‍💻 Author

**Mariam Mohamedali**
- GitHub: [@Mariam-Mohamedali](https://github.com/Mariam-Mohamedali)

---

<p align="center">Made with ❤️ and a passion for good food.</p>
