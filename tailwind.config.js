/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            /* ========================================
               Custom Color Palette - Dark Futuristic Theme
               ======================================== */
            colors: {
                // Primary dark backgrounds
                dark: {
                    900: '#0a0a0f',    // Deepest black
                    800: '#0f0f1a',    // Primary background
                    700: '#151525',    // Card backgrounds
                    600: '#1a1a2e',    // Elevated surfaces
                    500: '#252540',    // Border colors
                },
                // Neon accent colors
                neon: {
                    purple: '#a855f7',
                    blue: '#3b82f6',
                    cyan: '#06b6d4',
                    pink: '#ec4899',
                    green: '#10b981',
                },
                // Gradient colors
                gradient: {
                    start: '#667eea',
                    mid: '#764ba2',
                    end: '#f093fb',
                }
            },
            /* ========================================
               Custom Animations
               ======================================== */
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'liquid': 'liquid 4s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
                'slide-in-right': 'slideInRight 0.6s ease-out forwards',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                liquid: {
                    '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                    '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            /* ========================================
               Custom Font Families
               ======================================== */
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            /* ========================================
               Custom Backdrop Blur
               ======================================== */
            backdropBlur: {
                xs: '2px',
            },
            /* ========================================
               Custom Box Shadows - Glow Effects
               ======================================== */
            boxShadow: {
                'glow-sm': '0 0 10px rgba(168, 85, 247, 0.3)',
                'glow': '0 0 20px rgba(168, 85, 247, 0.4)',
                'glow-lg': '0 0 40px rgba(168, 85, 247, 0.5)',
                'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
                'glow-pink': '0 0 20px rgba(236, 72, 153, 0.4)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
            },
            /* ========================================
               Background Size for Gradient Animation
               ======================================== */
            backgroundSize: {
                '200%': '200% 200%',
            },
        },
    },
    plugins: [],
}
