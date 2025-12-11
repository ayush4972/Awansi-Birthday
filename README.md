# Birthday Celebration Website

A fully animated, interactive birthday website built with React, Tailwind CSS, and GSAP.

## Features

- **Password Protection**: Entry requires a specific date of birth.
- **Animated Cake**: SVG-based heart cake with interactive slices.
- **Realistic Candle**: Flickering flame animation that extinguishes automatically.
- **Celebration Effects**: Confetti and cutting interaction.
- **Responsive**: Works on desktop and mobile.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- GSAP (GreenSock Animation Platform)

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Customization

- **Date of Birth**: Modify `CORRECT_DOB` in `src/components/AuthModal.jsx`.
- **Timer**: Adjust the timeout in `src/components/CakeStage.jsx`.
- **Colors**: Update `tailwind.config.js` or `src/index.css`.

## License

MIT
