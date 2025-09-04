# Windows XP Portfolio Site

A React + TypeScript portfolio website that authentically mimics the Windows XP desktop experience. Built with modern web technologies while maintaining the nostalgic look and feel of Microsoft's classic operating system.

## 🚀 Features

### Desktop Experience
- **Bliss Wallpaper**: Authentic Windows XP background
- **Draggable Icons**: Desktop icons can be moved and positions persist across sessions
- **Icon Selection**: Single-click selects icons (blue highlight), double-click opens
- **Keyboard Support**: Enter key opens selected icons

### Windows System
- **XP-Style Windows**: Authentic title bars with minimize/close controls
- **Window Manager**: Proper z-order management and focus handling
- **Draggable Windows**: Move windows by dragging the title bar
- **Taskbar Integration**: Open windows appear as taskbar buttons

### Start Menu
- **Two-Pane Design**: White left pane with bio, blue right pane with programs
- **User Profile**: Avatar, name, and title display
- **Quick Links**: Email, GitHub, LinkedIn shortcuts
- **Program List**: Mirrors desktop icons for easy access

### Taskbar
- **Start Button**: Green gradient button with Windows logo
- **Live Clock**: Auto-updating time display
- **Audio Controls**: Speaker icon with mute/unmute functionality
- **Weather App**: Mini weather widget with location detection
- **Security Icon**: Links to SANS Internet Storm Center

## 🛠️ Technical Implementation

### Architecture
- **React 18**: Modern functional components with hooks
- **TypeScript**: Full type safety throughout the application
- **Context API**: Window manager and class token providers
- **Local Storage**: Icon position persistence


### Demo

 ![bliss](https://github.com/user-attachments/assets/5a1a9499-c459-4881-8ec2-9e289f4567a3)

![blissMobile](https://github.com/user-attachments/assets/2900de50-8668-4bcf-b7b8-784f9cf8b24a)

### Component Structure
```
src/
├── components/
│   ├── Desktop.tsx          # Main desktop container
│   ├── DesktopIcon.tsx      # Draggable desktop icons
│   ├── XpWindow.tsx         # Windows XP-style windows
│   ├── WindowLayer.tsx      # Window rendering layer
│   ├── Taskbar.tsx          # Bottom taskbar
│   └── StartMenu.tsx        # Start menu system
├── contexts/
│   ├── WindowManagerContext.tsx    # Window state management
│   └── ClassTokenProvider.tsx      # Production class obfuscation
├── utils/
│   └── windowContentFactory.tsx    # Dynamic window content
├── types/
│   └── index.ts             # TypeScript interfaces
└── constants/
    └── index.ts             # App constants and asset paths
```

### Key Technologies
- **Custom Drag & Drop**: Pure React implementation for smooth icon movement
- **Web Audio API**: System audio control for mute/unmute
- **Geolocation API**: User location for weather data
- **OpenWeatherMap API**: Real-time weather information
- **Local Storage**: Persistent icon positioning

## 🎨 Visual Design

### Windows XP Luna Blue Theme
- **Fonts**: Tahoma (fallback: Segoe UI, Arial)
- **Colors**: Authentic XP palette (#3f76c3, #2b579a, #F0F0F0)
- **Gradients**: Vertical gradients matching XP Luna Blue
- **Borders**: 2px dark borders with light inner edges
- **Shadows**: Subtle drop shadows for depth

### Responsive Elements
- **Taskbar**: Fixed 42px height with proper proportions
- **Windows**: 600x450px default size, draggable within viewport
- **Icons**: 32x32px with 20px text area below
- **Start Menu**: 400x500px with proper positioning

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd bliss

# Install dependencies
npm install

# Start development server
npm start
```

### Environment Variables
Create a `.env.local` file for development:
```env
REACT_APP_BUILD_SALT=dev-salt
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```

### Production Build
```bash
# Build for production
npm run build

# The build will include:
# - Obfuscated class names
# - No source maps
# - Minified and optimized code
# - Persistent icon positions
```

## 🔧 Configuration

### Customizing Icons
Edit `src/constants/index.ts` to modify:
- App names and labels
- Icon asset paths
- Default icon positions

### Adding New Window Types
Extend `src/utils/windowContentFactory.tsx` to add:
- New content types
- Custom window layouts
- Dynamic content generation

### Modifying the Theme
Update CSS variables in component files:
- Color schemes
- Dimensions
- Typography
- Spacing

## 🧪 Testing

### Manual Testing
- **Icon Dragging**: Move icons around desktop
- **Window Management**: Open, close, minimize windows
- **Start Menu**: Navigate through menu items
- **Taskbar**: Test all system tray functions
- **Persistence**: Reload page to verify icon positions

### Automated Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🚀 Deployment

### Static Hosting
The app is designed for static hosting platforms:
- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop deployment
- **GitHub Pages**: Free hosting for public repos
- **AWS S3**: Scalable static hosting

### Build Optimization
Production builds include:
- Tree-shaking for unused code
- Minification and compression
- Class name obfuscation
- No source maps
- Optimized asset loading

## 🎯 Future Enhancements

### Planned Features
- **Window Resizing**: Drag handles for window resizing
- **Multi-Monitor Support**: Extended desktop functionality
- **Custom Themes**: Alternative XP themes (Silver, Olive)
- **File System**: Basic file/folder operations
- **Context Menus**: Right-click functionality

### Performance Improvements
- **Virtual Scrolling**: For large icon lists
- **Lazy Loading**: Window content on demand
- **Service Worker**: Offline functionality
- **WebAssembly**: Performance-critical operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Microsoft**: Windows XP design inspiration
- **React Team**: Amazing framework
- **OpenWeatherMap**: Weather data API
- **Community**: Feedback and suggestions

---

Built with ❤️ and nostalgia by Chan Boswell
