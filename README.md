# 🎬 MovieCO. - Angular Movie & TV Show Platform

[![Status](https://img.shields.io/badge/status-in%20progress-yellow)]()
[![Angular](https://img.shields.io/badge/Angular-19.2.0-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)]()
[![PrimeNG](https://img.shields.io/badge/PrimeNG-19.1.3-27AE60?style=for-the-badge&logo=primeng&logoColor=white)]()
[![TMDB API](https://img.shields.io/badge/TMDB%20API-3.0-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white)]()

---

## 📖 Overview

**MovieCO.** is a modern, responsive Angular application that provides users with a comprehensive platform to explore, discover, and manage movies and TV shows. Built with Angular 19 and PrimeNG, it offers a seamless user experience with real-time data from The Movie Database (TMDB) API.

### 🎯 Project Goals
- Provide an intuitive interface for browsing movies and TV shows
- Implement personalized features like wishlists and favorites
- Create a responsive design that works across all devices
- Integrate with external APIs for real-time content
- Build a scalable architecture for future enhancements

**⚠️ This project is currently in active development and may have incomplete features.**

---

## 🚀 Features

### ✅ **Implemented Features**

#### 🎬 **Content Discovery**
- **Movie Categories**: Browse Now Playing, Popular, and Upcoming movies
- **TV Shows**: Explore trending TV series with detailed information
- **Search Functionality**: Find movies and TV shows by title, genre, or keywords
- **Detailed Pages**: Comprehensive movie and TV show detail pages with:
  - High-quality posters and backdrops
  - Plot summaries and overviews
  - Cast and crew information
  - User reviews and ratings
  - Similar content recommendations

#### 💾 **User Features**
- **Wishlist Management**: Add/remove movies and TV shows to personal wishlist
- **Session Persistence**: Wishlist data persists across browser sessions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between different visual themes

#### 🔧 **Technical Features**
- **Lazy Loading**: Optimized performance with route-based code splitting
- **Pagination**: Efficient handling of large datasets
- **API Integration**: Real-time data from TMDB API
- **Type Safety**: Full TypeScript implementation with interfaces
- **Reactive Programming**: RxJS for efficient data handling

### 🔄 **In Progress Features**
- **User Authentication**: Google OAuth integration (partially implemented)
- **User Registration**: Account creation and management
- **Advanced Filtering**: Genre, year, rating, and language filters
- **Offline Support**: Service worker for offline functionality
- **Performance Optimization**: Image lazy loading and caching

---

## 🏗️ Project Architecture

### **Frontend Architecture**
```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Main application pages
│   ├── services/           # Business logic and API calls
│   ├── interfaces/         # TypeScript interfaces
│   ├── store/              # State management (NgRx Signals)
│   ├── guards/             # Route guards
│   ├── pipes/              # Custom Angular pipes
│   └── directive/          # Custom directives
├── styles.scss             # Global styles
└── main.ts                 # Application entry point
```

### **Component Architecture**
- **Smart Components**: Pages that handle business logic
- **Dumb Components**: Reusable UI components
- **Service Layer**: API integration and data management
- **State Management**: NgRx Signals for reactive state

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **[Angular 19.2.0](https://angular.io/)** - Modern web framework
- **[TypeScript 5.7.2](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[RxJS 7.8.0](https://rxjs.dev/)** - Reactive programming library

### **UI Components & Styling**
- **[PrimeNG 19.1.3](https://www.primefaces.org/primeng/)** - Rich UI component library
- **[PrimeFlex 4.0.0](https://www.primefaces.org/primeflex/)** - CSS utility library
- **[PrimeIcons 7.0.0](https://www.primefaces.org/primeicons/)** - Icon library
- **SCSS** - Advanced CSS preprocessing

### **State Management**
- **[NgRx Signals 19.2.1](https://ngrx.io/)** - Reactive state management
- **Angular Router** - Client-side routing

### **External APIs**
- **[The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)** - Movie and TV show data
- **Google OAuth** - Authentication (in progress)

### **Development Tools**
- **Angular CLI 19.2.15** - Development and build tools
- **Karma & Jasmine** - Testing framework
- **Proxy Configuration** - API proxy for development

---

## 📁 Project Structure

### **Core Directories**

#### **Components** (`src/app/components/`)
- `hero/` - Main hero section component
- `home-movie-card/` - Movie card for home page
- `home-tv-card/` - TV show card for home page
- `home-movie-slider/` - Movie carousel component
- `home-tvshows-slider/` - TV shows carousel component
- `home-upcoming-slider/` - Upcoming movies slider
- `home-popular-slider/` - Popular movies slider
- `detail-similar-slider/` - Similar movies slider
- `detail-similar-tv-slider/` - Similar TV shows slider
- `wish-card/` - Wishlist item card
- `filter-card/` - Filter component
- `easy-login/` - Quick login component
- `hr-nav/` - Horizontal navigation
- `ver-nav/` - Vertical navigation
- `footer/` - Application footer

#### **Pages** (`src/app/pages/`)
- `home/` - Main home page
- `home-container/` - Home page container
- `details/` - Movie details page
- `details-tv/` - TV show details page
- `movies-playing/` - Now playing movies
- `movies-popular/` - Popular movies
- `movies-coming/` - Upcoming movies
- `tv-trend/` - Trending TV shows
- `search/` - Search functionality
- `wish-list/` - User wishlist
- `login/` - User login
- `register/` - User registration
- `notfound/` - 404 error page

#### **Services** (`src/app/services/`)
- `api.service.ts` - Main API service for movies
- `api-details.service.ts` - Movie details API
- `api-details-tv.service.ts` - TV show details API
- `google-auth.service.ts` - Google authentication
- `nav-toggle.service.ts` - Navigation state management

#### **Interfaces** (`src/app/interfaces/`)
- `movie.ts` - Movie data interface
- `movie-details.ts` - Detailed movie interface
- `movie-details-review.ts` - Movie review interface
- `tv.ts` - TV show data interface
- `tv-details.ts` - Detailed TV show interface
- `tv-details-review.ts` - TV show review interface
- `account.ts` - User account interface

---

## 🚀 Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Angular CLI](https://angular.io/cli) (v19.2.15 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MoviesApp.git
   cd MoviesApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

### **Build for Production**
```bash
npm run build
```

### **Running Tests**
```bash
npm test
```

---

## 🔧 Development

### **Development Server**
The application uses a proxy configuration to handle API requests during development. The proxy is configured in `proxy.conf.json` and routes `/api` requests to the TMDB API.

### **Environment Setup**
- **API Base URL**: `https://api.themoviedb.org/3`
- **Proxy Configuration**: Configured in `proxy.conf.json`
- **Development Port**: `4200`

### **Code Organization**
- **Components**: Reusable UI elements
- **Pages**: Main application views
- **Services**: Business logic and API calls
- **Interfaces**: TypeScript type definitions
- **Guards**: Route protection and navigation control

---

## 📱 Pages & Components

### **Main Pages**

#### **Home Page** (`/home`)
- Hero section with featured content
- Movie sliders (Now Playing, Popular, Upcoming)
- TV show trends
- Quick navigation to different sections

#### **Movie Details** (`/home/details/:id`)
- Comprehensive movie information
- Cast and crew details
- User reviews and ratings
- Similar movie recommendations
- Add to wishlist functionality

#### **TV Show Details** (`/home/details-tv/:id`)
- TV show information and episodes
- Cast and crew details
- Reviews and ratings
- Similar TV show recommendations

#### **Search Page** (`/home/search`)
- Search movies and TV shows
- Filter results by various criteria
- Real-time search suggestions

#### **Wishlist** (`/home/wishlist`)
- User's saved movies and TV shows
- Remove items from wishlist
- Session-based persistence

### **Navigation**
- **Horizontal Navigation**: Main menu items
- **Vertical Navigation**: Sidebar navigation
- **Breadcrumbs**: Page navigation context

---

## 🔌 API Integration

### **The Movie Database (TMDB) API**
The application integrates with TMDB API for real-time movie and TV show data.

#### **API Endpoints Used**
- `/movie/now_playing` - Currently playing movies
- `/movie/popular` - Popular movies
- `/movie/upcoming` - Upcoming movies
- `/tv/top_rated` - Top-rated TV shows
- `/movie/{id}` - Movie details
- `/tv/{id}` - TV show details

#### **API Configuration**
- **Base URL**: `https://api.themoviedb.org/3`
- **Authentication**: Bearer token authentication
- **Proxy**: Development proxy configured in `proxy.conf.json`

### **Google OAuth Integration**
- Google Sign-In integration (in progress)
- User authentication and profile management
- Secure token handling

---

## 🎨 UI/UX Features

### **Design System**
- **PrimeNG Components**: Consistent UI components
- **PrimeFlex Utilities**: Responsive CSS utilities
- **PrimeIcons**: Comprehensive icon library
- **SCSS**: Advanced styling capabilities

### **Responsive Design**
- **Tablet Support**: Responsive tablet layouts
- **Desktop Experience**: Enhanced desktop features
- **Cross-Browser**: Compatible with all modern browsers

### **User Experience**
- **Lazy Loading**: Optimized performance
- **Smooth Animations**: Enhanced user interactions
- **Loading States**: User feedback during data loading
- **Error Handling**: Graceful error management

---

## 🔄 State Management

### **NgRx Signals**
The application uses NgRx Signals for reactive state management:

- **Reactive State**: Automatic UI updates when state changes
- **Performance**: Optimized change detection
- **Type Safety**: Full TypeScript support
- **Developer Tools**: Enhanced debugging capabilities

### **Service Layer**
- **API Services**: Centralized API communication
- **Data Transformation**: Consistent data formatting
- **Error Handling**: Centralized error management

---

## 🔐 Authentication

### **Current Implementation**
- **Google OAuth**: Integration in progress
- **Session Management**: Browser session handling
- **Route Guards**: Protected route access

### **Planned Features**
- **User Profiles**: Personalized user experience
- **Role-Based Access**: Admin and user roles
- **Password Reset**: Account recovery functionality

---

## 📊 Data Models

### **Movie Interface**
```typescript
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  // ... additional properties
}
```

### **TV Show Interface**
```typescript
interface TV {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  // ... additional properties
}
```

### **User Account Interface**
```typescript
interface Account {
  id: string;
  email: string;
  name: string;
  picture: string;
  // ... additional properties
}
```

## 🤝 Contributing

We welcome contributions to improve MoviesApp! Here's how you can help:

### **How to Contribute**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow Angular style guide
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

### **Code Standards**
- Use TypeScript for type safety
- Follow Angular best practices
- Implement proper error handling
- Write clean, readable code
- Add appropriate comments

---

## 📞 Support & Contact

- **Project Link**: [https://github.com/yourusername/MoviesApp](https://github.com/yourusername/MoviesApp)
- **Issues**: [GitHub Issues](https://github.com/yourusername/MoviesApp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/MoviesApp/discussions)

---

## 🙏 Acknowledgments

- **[The Movie Database (TMDB)](https://www.themoviedb.org/)** for providing the movie and TV show data API
- **[PrimeNG](https://www.primefaces.org/primeng/)** for the excellent UI component library
- **[Angular Team](https://angular.io/)** for the amazing framework
- All contributors and supporters of this project

---

<div align="center">

**Made with ❤️ using Angular and PrimeNG**

[![Angular](https://img.shields.io/badge/Angular-19.2.0-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)]()
[![PrimeNG](https://img.shields.io/badge/PrimeNG-19.1.3-27AE60?style=for-the-badge&logo=primeng&logoColor=white)]()

</div>