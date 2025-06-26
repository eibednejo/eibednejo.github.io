# My App

This project is a web application that provides a chat interface along with user management features. It allows users to log in, sign up, manage their profiles, and subscribe to various plans. The application is built using React and TypeScript, and it integrates with Supabase for backend services.

## Features

- **Login Page**: Users can log in to their accounts using their credentials.
- **Signup Page**: New users can create an account by filling out a registration form.
- **User Profile Page**: Users can view and update their profile information.
- **Admin Page**: Admin users can manage users and subscriptions.
- **Subscription Page**: Users can view and manage their subscription plans.
- **Chat Page**: A chat interface that supports:
  - Uploading CSV files
  - Uploading files for knowledge base
  - Connecting to the database

## Technologies Used

- React
- TypeScript
- Supabase
- CSS

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your Supabase project and configure the client in `src/supabase/client.ts`.

5. Start the development server:
   ```
   npm start
   ```

## Directory Structure

```
my-app
├── src
│   ├── components
│   │   ├── AdminPage.tsx
│   │   ├── ChatPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── SubscriptionPage.tsx
│   │   └── UserProfilePage.tsx
│   ├── supabase
│   │   └── client.ts
│   ├── utils
│   │   └── db.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.