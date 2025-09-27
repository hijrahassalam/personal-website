# Hijrah Assalam - Personal Website

A modern, responsive personal website built with HTML, Tailwind CSS, and vanilla JavaScript. Designed to be fully static and deployable directly to cPanel without any build process.

## 🚀 Features

- **Enhanced Hero Section**: Two-column layout with profile image, quick stats, and improved typography
- **Modern Design**: Clean, professional layout with smooth animations and subtle gradients
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Fully Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Complete meta tags, Open Graph, and JSON-LD schema
- **Smooth Scrolling**: Navigation with active link highlighting
- **Contact Form**: Ready-to-use contact form (requires backend implementation)
- **Organized Code**: Separated CSS and JavaScript files for better maintainability
- **Performance**: Optimized for fast loading with minimal dependencies

## 📁 Project Structure

```
personal-website/
├── index.html              # Main website file
├── assets/
│   ├── css/
│   │   └── app.css         # Custom styles
│   ├── js/
│   │   └── app.js          # Custom JavaScript
│   └── images/
│       ├── .gitkeep        # Placeholder for images
│       ├── profile.jpg     # Your profile photo (add this)
│       └── project-*.jpg   # Project thumbnails (add these)
├── README.md               # This file
└── contact.php             # Backend form handler (implement separately)
```

## 🛠 Setup Instructions

### 1. Add Your Images
- Add your profile photo as `assets/images/profile.jpg` (recommended: 400x400px)
- Add project thumbnails as needed
- The website includes fallback placeholder images if files are missing

### 2. Customize Content
- Update the project links in the Projects section
- Modify the blog posts in the Writing section
- Add your actual social media links
- Update contact information

### 3. Deploy to cPanel
1. Upload all files to your `public_html` directory
2. Ensure the folder structure is maintained
3. The website will work immediately - no build process required!

### 4. Contact Form Backend (Optional)
To make the contact form functional, create a `contact.php` file:

```php
<?php
if ($_POST) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Add your email sending logic here
    // Return appropriate HTTP status codes
    
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
```

## 🎨 Customization

### Colors
The website uses a primary color scheme based on Indigo/Blue. To change colors, modify the Tailwind config in the `<script>` section:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    // Update these values
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    500: '#6366f1',
                    600: '#4f46e5',
                    // ... etc
                }
            }
        }
    }
}
```

### Content
- **Hero Section**: Update name, tagline, and call-to-action buttons
- **About Section**: Modify bio text and skills
- **Projects**: Add/remove project cards and update links
- **Writing**: Update blog post previews
- **Contact**: Update contact information and social links

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

- **Framework**: None (vanilla HTML/CSS/JS)
- **CSS Framework**: Tailwind CSS (via CDN)
- **JavaScript**: ES6+ vanilla JavaScript
- **Icons**: Heroicons (inline SVG)
- **Fonts**: System fonts for optimal performance
- **Build Process**: None required

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements that could benefit others, pull requests are welcome!

## 📞 Support

If you need help customizing this website, feel free to reach out:
- Email: hello@hijrahassalam.com
- GitHub: [@hijrahassalam](https://github.com/hijrahassalam)
- LinkedIn: [hijrahassalam](https://linkedin.com/in/hijrahassalam)

---

Built with ❤️ by Hijrah Assalam
