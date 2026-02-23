# Wingman.ai Setup Instructions

## Prerequisites

### Required Software
1. **Node.js 20+** - Download from https://nodejs.org/en/download/
2. **MySQL 8.0+** - Download from https://dev.mysql.com/downloads/mysql/
3. **Swift 5.9+** - Included with Xcode on macOS

## Setup Steps

### 1. Install Node.js Dependencies
```bash
# Navigate to WingmanWeb directory
cd Wingman/Sources/WingmanWeb

# Install dependencies
npm install
```

### 2. Setup Database
```bash
# Start MySQL service (macOS)
brew services start mysql

# Run database setup script
node setup-database.js
```

### 3. Configure Environment Variables
The `.env.local` file has already been created with the following settings:
```env
# Frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_ENV=development

# Backend (API Routes)
DATABASE_URL=mysql://root:password@localhost:3306/wingman_dev
JWT_SECRET=your_jwt_secret_key_change_in_production
```

### 4. Run Development Server
```bash
# Start Next.js development server
npm run dev

# Server will be available at http://localhost:3000
```

### 5. Run Mac Client
```bash
# Navigate to project root
cd Wingman

# Build and run the Mac app
swift build
swift run
```

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running: `brew services start mysql`
- Verify MySQL credentials: default is root/password
- Check if MySQL is accessible: `mysql -u root -ppassword`

### Node.js Issues
- Ensure Node.js 20+ is installed: `node -v`
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Proxy Configuration
If you're behind a proxy, ensure your HTTP_PROXY and HTTPS_PROXY environment variables are set correctly.

## Available Scripts

### Web App
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Mac App
- `swift build` - Build the app
- `swift run` - Run the app
- `swift test` - Run tests
