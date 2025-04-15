document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling navigation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Contact Form Validation
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const formMessage = document.getElementById("form-message");
        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "All fields are required!";
            formMessage.style.color = "red";
            this.classList.add("shake");
            setTimeout(() => this.classList.remove("shake"), 500);
        } else {
            formMessage.textContent = "Message sent successfully!";
            formMessage.style.color = "green";
            document.getElementById("contact-form").reset();
        }
    });

    // Like Buttons
    document.querySelectorAll(".like-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const countSpan = button.querySelector(".like-count");
            let currentCount = parseInt(countSpan.textContent);
            countSpan.textContent = currentCount + 1;

            rippleEffect(e, button);
        });
    });

    // Comment Sections
    document.querySelectorAll(".post").forEach(post => {
        const nameInput = post.querySelector(".comment-name");
        const textArea = post.querySelector(".comment-text");
        const submitBtn = post.querySelector(".comment-submit");
        const commentList = post.querySelector(".comment-list");

        submitBtn.addEventListener("click", (e) => {
            const name = nameInput.value.trim();
            const comment = textArea.value.trim();

            if (name !== "" && comment !== "") {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${name}</strong>: ${comment}`;
                commentList.appendChild(li);
                rippleEffect(e, submitBtn);
                nameInput.value = "";
                textArea.value = "";
            }
        });

        // Touch pop effect on post
        post.addEventListener("touchstart", () => {
            post.classList.add("touch-pop");
            setTimeout(() => post.classList.remove("touch-pop"), 200);
        });
    });

    // Scroll to top on double-tap header
    let lastTap = 0;
    document.querySelector("header").addEventListener("touchend", () => {
        const now = new Date().getTime();
        const timeDiff = now - lastTap;
        if (timeDiff < 300 && timeDiff > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        lastTap = now;
    });

    // Ripple Effect Function
    function rippleEffect(event, element) {
        const circle = document.createElement("span");
        circle.classList.add("ripple");
        const rect = element.getBoundingClientRect();
        circle.style.left = `${event.clientX - rect.left}px`;
        circle.style.top = `${event.clientY - rect.top}px`;
        element.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    }
});
