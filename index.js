const themes = ["black", "orange", "purple", "green","blue"];

const themeContainer = document.querySelector("#theme-container");

function main() {
    themeContainer.innerHTML = `
    <div class="border-2 border-slate-600 rounded-lg my-4 mx-2 bg-bgPrimary">
        <div class="flex gap-2">
            ${themes.map(t => (
                `<span data-theme="${t}" class="px-2 py-1 bg-${t}-500 text-black cursor-pointer rounded">${t}</span>`
            )).join('')}
        </div>
        
        <div id="card" class="md:flex md:gap-7 m-2">
          <div class="img md:w-1/2 relative aspect-video rounded-sm overflow-hidden">
            <img src="./img/0cc43006-f909-484d-a79b-6314544d243d.jpg" class="object-contain" alt="">
            <div class="absolute inset-0 bg-transparent hover:bg-secondary opacity-50"></div>
          </div>
          <div class="flex flex-col gap-4 md:w-1/2 items-start col-span-6">
            <h1 class="text-primary font-bold text-4xl">Woodside Paradise</h1>
            <p class="flex-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nobis corporis delectus vel quod veniam eligendi, fuga voluptates temporibus voluptate sequi dolor fugit tenetur odio ex? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nobis corporis delectus vel quod veniam eligendi, fuga voluptates temporibus voluptate sequi dolor fugit tenetur odio ex? Accusantium mollitia commodi recusandae quod esse consequuntur perspiciatis sit, error velit. Ipsa beatae nulla natus quisquam facilis rerum veritatis?</p>

            <div class="flex gap-4">
              <button class="bg-primary py-2 px-4 hover:text-black hover:bg-secondary text-tBase font-medium">Buy now</button>
              <button class="bg-bgPrimary py-2 px-4 border-secondary border-2 hover:border-primary font-medium">Explore</button>
            </div>
          </div>
        </div>
    </div>
    `
    document.querySelectorAll('[data-theme]').forEach(span => {
        span.addEventListener("click", () => {
            const selectedTheme = span.dataset.theme;
            document.body.classList.remove(...themes.map(t => `theme-${t}`));
            document.body.classList.add(`theme-${selectedTheme}`);
            
            localStorage.setItem("selectedTheme", selectedTheme); // Store theme
        });
    });


    function applySavedTheme() {
        const savedTheme = localStorage.getItem("selectedTheme");
        if (savedTheme && themes.includes(savedTheme)) {
            document.body.classList.add(`theme-${savedTheme}`);
        }
    }
    
    applySavedTheme();
}



main();