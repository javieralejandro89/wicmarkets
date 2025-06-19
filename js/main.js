document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
      const input = document.querySelector("#phone");
      const errorMsg = document.querySelector("#telefono-error");
      const iti = window.intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          fetch('https://ipinfo.io/json?token=b324cd382b183b')
            .then(resp => resp.json())
            .then(resp => callback(resp.country))
            .catch(() => callback('mx'));
        },
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js"
      });

      // Validación en tiempo real
      input.addEventListener("input", () => {
        if (iti.isValidNumber() || input.value.trim() === "") {
          errorMsg.style.display = "none";
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
        } else {
          errorMsg.style.display = "block";
          input.classList.remove("is-valid");
          input.classList.add("is-invalid");
        }
      });

      // Validación al enviar el formulario
      const form = document.querySelector("form");
      form.addEventListener("submit", function (e) {
        if (!iti.isValidNumber()) {
          e.preventDefault();
          errorMsg.style.display = "block";
          input.classList.add("is-invalid");
          alert("Por favor ingresa un número de teléfono válido.");
        } else {
          // Cambia el valor del input al formato internacional antes de enviar
          input.value = iti.getNumber();
        }
      });
    });


  document.addEventListener('DOMContentLoaded', function () {
  console.log("JS cargado correctamente");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // delay progresivo
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.benefit-item, .instrument-item, .section-title, .section-intro, .instruments-wide, .benefits-wide').forEach((el) => {
    observer.observe(el);
  });

});

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".whatsapp-container");

    if (window.innerWidth <= 768) {
      let isDragging = false;
      let offsetX, offsetY;

      const savedX = localStorage.getItem("whatsappPosX");
      const savedY = localStorage.getItem("whatsappPosY");

      // Si existe posición guardada, úsala
      if (savedX && savedY) {
        btn.style.left = `${savedX}px`;
        btn.style.top = `${savedY}px`;
      } else {
        // Posición por defecto en móviles si es la primera vez
        btn.style.left = "20px";
        btn.style.top = "70vh";
      }

      btn.style.position = "fixed";
      btn.style.right = "auto";
      btn.style.bottom = "auto";

      btn.addEventListener("touchstart", function (e) {
        isDragging = true;
        const touch = e.touches[0];
        const rect = btn.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
      });

      btn.addEventListener("touchmove", function (e) {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        const x = touch.clientX - offsetX;
        const y = touch.clientY - offsetY;

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;

        // Guardar
        localStorage.setItem("whatsappPosX", x);
        localStorage.setItem("whatsappPosY", y);
      });

      btn.addEventListener("touchend", function () {
        isDragging = false;
      });
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const images = document.querySelectorAll(".carousel-track img");
  const dots = document.querySelectorAll(".dot");
  const caption = document.getElementById("carousel-caption");

  const captions = [
    "Amazon ha crecido más del 300% en la última década.",
    "Invertir a largo plazo puede traer grandes beneficios.",
    "Amazon lidera sectores clave como la nube y el e-commerce."
  ];

  let currentIndex = 0;

  function updateCarousel() {
    const imageWidth = images[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    caption.style.opacity = 0;
    setTimeout(() => {
      caption.textContent = captions[currentIndex];
      caption.style.opacity = 1;
    }, 200);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }, 5000);

  window.addEventListener("resize", updateCarousel);
});









