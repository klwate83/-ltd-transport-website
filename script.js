document.addEventListener("DOMContentLoaded", function () {
    setupSlider(".slide", 3000);
    setupSlider(".fleet-slide", 3500);
    setupContactForm();
});

function setupSlider(selector, intervalTime) {
    let currentSlide = 0;
    const slides = document.querySelectorAll(selector);

    if (slides.length === 0) return;

    setInterval(function () {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }, intervalTime);
}

function setupContactForm() {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");
        submitButton.textContent = "SENDING...";
        submitButton.disabled = true;

        emailjs.send("service_y3t2h1j", "template_xtok9cc", {
            title: "LTD Transport Website Submission",
            name: document.getElementById("name").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
        })
        .then(function () {
            alert("Thank you. Your enquiry has been sent successfully.");
            contactForm.reset();
            submitButton.textContent = "SEND ENQUIRY";
            submitButton.disabled = false;
        })
        .catch(function (error) {
            alert("Sorry, something went wrong. Please try again.");
            console.error("EmailJS error:", error);
            submitButton.textContent = "SEND ENQUIRY";
            submitButton.disabled = false;
        });
    });
}