# Todo Frontend (Angular)

This is the frontend application for the Todo project built with Angular 20.1.6.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  - Verify npm installation: `npm --version`

- **Angular CLI** (version 20.1.6 or higher)
  - Install globally: `npm install -g @angular/cli`
  - Verify installation: `ng version`

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Abdullah-Nazly/Todo-frontend.git
cd Todo-frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required packages listed in `package.json`, including:
- Angular core packages
- Bootstrap for styling
- RxJS for reactive programming
- TypeScript and other development tools

### 3. Start Development Server

```bash
ng serve
```

The application will be available at `http://localhost:4200/`

**Alternative commands:**
- `npm start` - Same as `ng serve`
- `ng serve --open` - Opens the browser automatically
- `ng serve --port 4201` - Run on a different port

### 4. Build for Production

```bash
ng build
```

This creates a `dist/` folder with optimized production files.

## Development Commands

### Code Scaffolding

```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# Generate a new guard
ng generate guard guard-name

# Generate a new interceptor
ng generate interceptor interceptor-name
```

### Testing

```bash
# Run unit tests
ng test

# Run end-to-end tests
ng e2e

# Run tests with coverage
ng test --code-coverage
```

### Linting and Formatting

```bash
# Lint the code
ng lint

# Format the code (if you have Prettier configured)
npm run format
```

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── home/           # Home page component
│   │   ├── login/          # Login component
│   │   ├── navbar/         # Navigation component
│   │   ├── signup/         # Signup component
│   │   └── todo/           # Todo-related components
│   ├── guards/             # Route guards for authentication
│   ├── interceptors/       # HTTP interceptors
│   ├── services/           # Business logic and API calls
│   └── user/               # User-related functionality
├── assets/                 # Static assets (images, icons, etc.)
└── styles.scss            # Global styles
```

## Configuration

### Environment Variables

Create environment files if needed:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

### API Configuration

Update the API base URL in your services to point to your backend server.

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   ng serve --port 4201
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Angular CLI version mismatch**
   ```bash
   npm install -g @angular/cli@latest
   ```

4. **Build errors**
   ```bash
   ng build --verbose
   ```

### Performance Tips

- Use `ng build --prod` for production builds
- Enable Angular's production mode
- Use OnPush change detection strategy for components
- Lazy load modules when possible

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Angular CLI Overview](https://angular.dev/tools/cli)
- [Angular Style Guide](https://angular.dev/style-guide)
- [Angular Material](https://material.angular.io/)

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all prerequisites are installed correctly
3. Ensure you're using compatible versions of Node.js and Angular CLI
4. Check the [Angular GitHub issues](https://github.com/angular/angular/issues) for known problems
