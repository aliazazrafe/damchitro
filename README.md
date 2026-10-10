Bazar Dor

Bazar Dor is a responsive daily essential product price tracking web application. It allows users to explore current market prices, compare price changes, browse products by category, and view detailed market-wise price information.

The application also includes authentication using Better Auth with Email/Password, Google, and GitHub.

---

1. Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Better Auth
- PostgreSQL
- React Hot Toast
- Programming Hero Bazar Dor API

---

2. Key Features

1. Daily Product Price Tracking
   - View the latest prices of essential products.
   - See products with increased and decreased prices.

2. Category Based Products
   - Browse products by categories such as Rice, Lentils, Oil, Vegetables, Fish, Meat, Egg & Milk, and Spices.

3. Product Sorting
   - Default
   - Price Low to High
   - Price High to Low

4. Product Details
   - View detailed product information.
   - Check minimum, maximum, and average prices.
   - Compare prices from different markets.

5. Authentication System
   - Email and Password Sign Up
   - Email and Password Sign In
   - Google Authentication
   - GitHub Authentication
   - Sign Out functionality

6. Protected Routes
   - Product details and user-specific pages are protected.
   - Unauthenticated users are redirected to the Sign In page.

7. User Profile
   - View account information.
   - Update the user's name from the Update Profile page.

8. Toast Notifications
   - Success and error notifications for Sign In, Sign Up, Social Login, Sign Out, validation errors, and profile updates.

9. Loading Skeletons
   - Skeleton loading states are displayed while product data is being fetched.

10. Custom 404 Page
    - Invalid routes and unavailable products or categories display a friendly 404 page.

11. Responsive Design
    - Responsive layout for mobile, tablet, laptop, and desktop devices.

---

3. Main Routes

- `/` - Home
- `/category/[slug]` - Category Products
- `/product/[slug]` - Product Details
- `/signin` - Sign In
- `/signup` - Sign Up
- `/profile` - User Profile
- `/profile/update` - Update Profile

---

4. Authentication

Authentication is implemented using Better Auth.

Supported authentication methods:

- Email and Password
- Google
- GitHub

---

5. API

Product and market price data are fetched from the Programming Hero Bazar Dor API.

---

6. Run Locally

Clone the project:

```bash
git clone https://github.com/aliazazrafe/damchitro.git
```

Go to the project directory:

```bash
cd damchitro
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and configure the required environment variables for:

- Database connection
- Better Auth
- Google OAuth
- GitHub OAuth

Do not commit the `.env.local` file to GitHub.

Start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

7. Production Build

```bash
npm run build
```

---

8. Live Website

Live Site: Will be added after Vercel deployment.

---

9. GitHub Repository

https://github.com/aliazazrafe/damchitro

---

10. Author

Ali Azaz Rafe

Aspiring Full Stack Web Developer