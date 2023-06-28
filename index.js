// let slideIndex = 1;
// showSlides(slideIndex);

// function addSlides(n) {
//   showSlides((slideIndex += n));
// }

// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

// function showSlides(n) {
//   let slides = document.getElementsByClassName("project");
//   let dots = document.getElementsByClassName("dot");

//   if (n > slides.length) slideIndex = 1;
//   if (n < 1) slideIndex = slides.length;

//   for (let i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//     dots[i].className = dots[i].className.replace(" active", "");
//   }

//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
// }

const checkBoxRef = document.getElementsByClassName("hamburger")[0];
const links = document.querySelectorAll(".link");

links.forEach((link) => {
  link.addEventListener("click", () => {
    checkBoxRef.click();
  });
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = e.target;
    document
      .querySelector(`${section.getAttribute("href")}`)
      .scrollIntoView({ behavior: "smooth" });
  });
});

const submitBtn = document.querySelector(".submit");
const popupModal = document.querySelector(".submit_popup");
const close = document.querySelector(".close");
const body = document.querySelector("body");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const textArea = document.querySelector("textarea");
const form = document.querySelector("form");

const resertForm = () => {
  inputName.value = "";
  inputEmail.value = "";
  textArea.value = "";
};

const handleSubmit = (event) => {
  event.preventDefault();

  if (
    inputName.value === "" ||
    inputEmail.value === "" ||
    textArea.value === ""
  )
    return;
  popupModal.style.display = "block";
  body.classList.add("modal-open");

  const myForm = event.target;
  const formData = new FormData(myForm);
  console.log(formData);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(resertForm())
    .catch((error) => alert(error));
};

form.addEventListener("submit", handleSubmit);

close.addEventListener("click", (e) => {
  e.preventDefault();
  popupModal.style.display = "none";
  body.classList.remove("modal-open");
});

popupModal.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("popup_content")) return;
  popupModal.style.display = "none";
  body.classList.remove("modal-open");
});
