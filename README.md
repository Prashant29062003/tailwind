
---

# **Tailwind CSS Theming Guide**

## **1️ Setting Up Tailwind CSS with Themes**
To implement **multiple themes** dynamically using CSS variables, we use Tailwind's `@layer base` for defining the colors inside `:root`.

### **Define Theme Variables in `main.css`**
```css
@layer base {
    :root {
        --color-primary: hsl(0, 0%, 0%);
        --color-secondary: hsl(0, 0%, 50%);
        --color-text-base: hsl(0, 0%, 100%);
        --color-bg-primary: hsl(0, 0%, 100%);
    }
}

/* Themes */
.theme-black {
    --color-primary: hsl(0, 0%, 0%);
    --color-secondary: hsl(0, 0%, 50%);
}

.theme-orange {
    --color-primary: hsl(25, 100%, 50%);
    --color-secondary: hsl(25, 100%, 65%);
}

.theme-purple {
    --color-primary: hsl(270, 100%, 50%);
    --color-secondary: hsl(270, 100%, 65%);
}

.theme-green {
    --color-primary: hsl(120, 100%, 35%);
    --color-secondary: hsl(120, 100%, 45%);
}

.theme-blue {
    --color-primary: hsl(220, 100%, 50%);
    --color-secondary: hsl(220, 100%, 65%);
}
```

### **Explanation**
- `:root` sets **default theme colors** (black & white).
- Different `.theme-*` classes define **other themes** by overriding variables.

---

## **2️Extend Tailwind Colors Using CSS Variables**
Tailwind doesn’t directly recognize CSS variables, so we need to **extend** Tailwind’s theme configuration.

### **Modify `tailwind.config.js`**
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["*.{html,js}"], // Ensure Tailwind scans your files
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)", // Use CSS variables in Tailwind
        secondary: "var(--color-secondary)",
        bgPrimary: "var(--color-bg-primary)",
        tBase: "var(--color-text-base)"
      }
    }
  },
  plugins: [],
};
```

### Explanation**
- Adds `primary`, `secondary`, `bgPrimary`, and `tBase` colors using CSS variables.
- Allows Tailwind classes like `bg-primary`, `text-primary`, etc.

---

## **Applying Dynamic Theme Switching**
Now, let’s implement **JavaScript-based theme switching**.

### Create `script.js`**
```js
const themes = ["black", "orange", "purple", "green", "blue"];
const themeContainer = document.querySelector("#theme-container");

function main() {
    themeContainer.innerHTML = `
    <div class="border-2 border-slate-600 rounded-lg my-4 mx-2 bg-bgPrimary p-4">
        <div class="flex gap-2">
            ${themes.map(t => (
                `<span data-theme="${t}" class="px-2 py-1 bg-${t}-500 text-black cursor-pointer rounded">${t}</span>`
            )).join('')}
        </div>
        
        <div id="card" class="md:flex md:gap-7 m-2">
          <div class="img md:w-1/2 relative aspect-video rounded-sm overflow-hidden">
            <img src="./img/sample.jpg" class="object-contain" alt="Sample Image">
            <div class="absolute inset-0 bg-transparent hover:bg-secondary opacity-50"></div>
          </div>
          <div class="flex flex-col gap-4 md:w-1/2 items-start">
            <h1 class="text-primary font-bold text-4xl">Themed Card</h1>
            <p class="flex-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

            <div class="flex gap-4">
              <button class="bg-primary py-2 px-4 hover:text-black hover:bg-secondary text-tBase font-medium">Buy now</button>
              <button class="bg-bgPrimary py-2 px-4 border-secondary border-2 hover:border-primary font-medium">Explore</button>
            </div>
          </div>
        </div>
    </div>
    `;

    document.querySelectorAll('[data-theme]').forEach(span => {
        span.addEventListener("click", () => {
            const selectedTheme = span.dataset.theme;
            document.body.classList.remove(...themes.map(t => `theme-${t}`));
            document.body.classList.add(`theme-${selectedTheme}`);
            localStorage.setItem("selectedTheme", selectedTheme);
        });
    });
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme && themes.includes(savedTheme)) {
        document.body.classList.add(`theme-${savedTheme}`);
    }
}

applySavedTheme();
main();
```

### **Explanation**
- **Creates buttons** for each theme dynamically.
- **Applies the selected theme** to `document.body`.
- **Saves theme in `localStorage`** so it persists after refresh.

---

## **4️Ensuring Tailwind Doesn’t Purge Dynamic Classes**
Since Tailwind **purges unused classes**, we must **whitelist theme colors**.

### **Add This to `tailwind.config.js`**
```js
safelist: [
  'bg-black-500', 'bg-orange-500', 'bg-purple-500', 'bg-green-500', 'bg-blue-500'
]
```
OR manually add these classes in your HTML file inside a hidden div.

---

## **5️Example HTML Structure**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Theme Switcher</title>
    <link href="styles.css" rel="stylesheet">
    <script src="script.js" defer></script>
</head>
<body class="theme-black">
    <div id="theme-container"></div>
</body>
</html>
```
### **Explanation**
- Default theme is **black** (`body class="theme-black"`).
- Theme switching is applied on `body` dynamically.

---

## **6️ How Everything Works Together**
1. **CSS (`main.css`)** defines theme variables.
2. **Tailwind (`tailwind.config.js`)** allows using `var(--color-xyz)`.
3. **JavaScript (`script.js`)** adds event listeners to change themes.
4. **LocalStorage** keeps the selected theme after a refresh.

---

## **Final Thoughts**
- Uses **CSS variables** for themes.  
- Works with **Tailwind's extend & safelist**.  
- Saves the theme **even after page reload**.  
- **Lightweight & efficient.** 🚀  

---
