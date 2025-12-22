const greetings = [
  "Hello",
  "Hola",
  "Olá",
  "Hallo",
  "Bonjour",
  "Dia dhuit",
  "Cześć",
];
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
const elements = document.querySelectorAll(".highlight-anim");

elements.forEach((element) => {
  let index = 0;
  let interval: number | undefined;

  element.textContent = greetings[0];

  const animate = () => {
    index = (index + 1) % greetings.length;
    const targetText = greetings[index];
    let iteration = 0;

    clearInterval(interval);

    interval = window.setInterval(() => {
      element.textContent = targetText
        .split("")
        .map((letter, i) => {
          if (i < iteration) {
            return targetText[i];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, 40);
  };

  setInterval(animate, 3000);
});
