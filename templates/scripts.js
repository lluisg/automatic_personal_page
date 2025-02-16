/*!
    * Start Bootstrap - Resume v6.0.1 (https://startbootstrap.com/template-overviews/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */
(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
      if (
          location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
      ) {
          var target = $(this.hash);
          target = target.length
              ? target
              : $("[name=" + this.hash.slice(1) + "]");
          if (target.length) {
              $("html, body").animate(
                  {
                      scrollTop: target.offset().top,
                  },
                  1000,
                  "easeInOutExpo"
              );
              return false;
          }
      }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
      $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
      target: "#sideNav",
  });
})(jQuery); // End of use strict


// --------------------- SCRIPT CONTACT ---------------------
const submit_btn = document.getElementById('btn-contact-submit');

submit_btn.addEventListener('submit', (e)=>{
  e.preventDefault();
  submit_btn.innerHTML = 'Message sent.<br>To send another refresh the page.'
  submit_btn.classList.remove("btn-dark");
  submit_btn.classList.add("btn-success");
  submit_btn.setAttribute('disabled', true);
})


// --------------------- SCRIPT BUTTONS ---------------------
{% set first_ID = (data.EXTRA_INFO.values() | selectattr('TYPE', 'eq', 'TYPE') | first).ID -%}

window.onload = function() {
  activateProjectFilter('{{ first_ID }}');
};
function activateProjectFilter(case_activate) {
  activateFilter(case_activate);
  selectButton(case_activate);
};


function activateFilter(case_filter) {
  // HIDE ALL THE PROJECTS EXCEPT THE ONES OF THE SAME TYPE AS THE FILTER
  // IF ALL IS CLICKED, ALL WILL BE SHOWN
  type_filter = "type_".concat(case_filter.toLowerCase());

  var allcases = [
  {%- for TYPE in data.EXTRA_INFO.values() | selectattr('TYPE', 'eq', 'TYPE') -%}
    {%- if TYPE.ID == first_ID -%}
      "type_{{ TYPE.ID }}"
    {%- else -%}
      , "type_{{ TYPE.ID }}"
    {%- endif -%}
  {%- endfor -%}
  ];

  if (case_filter != "all"){
    for (var i = 0, ii = allcases.length; i < ii; i++) {
      var myElements = document.getElementsByClassName(allcases[i]);
      for (var j = 0, jj = myElements.length; j < jj; j++) {
        myElements[j].style.display = "none";
      };
    };

    var myElements = document.getElementsByClassName(type_filter);
    for (var j = 0, jj = myElements.length; j < jj; j++) {
      myElements[j].style.display = "block";
    };

  }else{
    for (var i = 0, ii = allcases.length; i < ii; i++) {
      var myElements = document.getElementsByClassName(allcases[i]);
      for (var j = 0, jj = myElements.length; j < jj; j++) {
        myElements[j].style.display = "block";
      };
    };
  };
};

function selectButton(case_button) {
  // CHANGE THE CLASS TO BUTTON FILLED WITH THE COLOR,
  // AND ALL THE OTHER BUTTONS TO ONLI THE OUTLINE
  button_filter = "flt_btn_".concat(case_button.toLowerCase());

  {% for TYPE in data.EXTRA_INFO.values() | selectattr('TYPE', 'eq', 'TYPE') -%}
  document.getElementById("flt_btn_{{ TYPE.ID }}").classList.remove("btn-{{ TYPE.COLOR }}");
  document.getElementById("flt_btn_{{ TYPE.ID }}").classList.add("btn-outline-{{ TYPE.COLOR }}");
  {% endfor -%}

  {% for TYPE in data.EXTRA_INFO.values() | selectattr('TYPE', 'eq', 'TYPE') -%}
    {%- if TYPE.ID == first_ID -%}
  if (button_filter=="flt_btn_{{ TYPE.ID }}"){
    document.getElementById("flt_btn_{{ TYPE.ID }}").classList.remove("btn-outline-{{ TYPE.COLOR }}");
    document.getElementById("flt_btn_{{ TYPE.ID }}").classList.add("btn-{{ TYPE.COLOR }}");
  }
    {%- else -%}
  else if (button_filter=="flt_btn_{{ TYPE.ID }}"){
    document.getElementById("flt_btn_{{ TYPE.ID }}").classList.remove("btn-outline-{{ TYPE.COLOR }}");
    document.getElementById("flt_btn_{{ TYPE.ID }}").classList.add("btn-{{ TYPE.COLOR }}");
  }
    {%- endif -%}
  {%- endfor %}
};


// --------------------- GO TO TOP SCRIPT ---------------------
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
