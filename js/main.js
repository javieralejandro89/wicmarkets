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





