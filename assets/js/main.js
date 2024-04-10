document.addEventListener('DOMContentLoaded', function () {

   const toggleBtn = document.querySelector('.toggle-slide-btn');
   const menuNav = document.querySelector('header nav');
   const searchIcon = document.querySelector('.search-icon');
   const searchForm = document.querySelector('.search-form');

   const svg = {
      bar1: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="#00000099"><path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm64 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zm384 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"></path></svg>',
      cross: '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512" fill="#00000099"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>',
      search1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="#565656" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      search2: '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512" fill="#00000099"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>',
   };

   toggleBtn.addEventListener('click', function () {
      const isMenuActive = menuNav.classList.toggle('show_menu');
      searchForm.classList.remove('search-bar-show');
      toggleBtn.innerHTML = isMenuActive ? svg.cross : svg.bar1;
      if (isMenuActive) searchIcon.innerHTML = svg.search1;
   });

   searchIcon.addEventListener('click', function () {
      const isSearchActive = searchForm.classList.toggle('search-bar-show');
      menuNav.classList.remove('show_menu');
      searchIcon.innerHTML = isSearchActive ? svg.search2 : svg.search1;
      if (isSearchActive) toggleBtn.innerHTML = svg.bar1;
   });

   // mobile menu on click

   const dropdowns = document.querySelectorAll(".dropdown");
   function toggleDropdown(e) {
      // e.preventDefault();
      e.stopPropagation();

      const li = e.target.parentNode;

      dropdowns.forEach((dropdown) => {
         if (dropdown !== li && !dropdown.contains(li)) {
            dropdown.classList.remove("show-dropdown");
         }
      });

      li.classList.toggle("show-dropdown");
   }

   dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", toggleDropdown);
   });

   // // Add a click event listener to the document to close dropdowns when clicking outside
   document.addEventListener("click", (e) => {
      const isMenuActive = menuNav.classList.contains("show_menu");
      const targetElement = toggleBtn.querySelector(e.target.tagName);


      if (
         ![...dropdowns].some((dropdown) => dropdown.contains(e.target)) &&
         !targetElement
      ) {
         dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("show-dropdown");
         });


         menuNav.classList.remove("show_menu");
         if (isMenuActive) {
            toggleBtn.innerHTML = isMenuActive ? svg.bar1 : svg.cross;
         }

      }
   });

   // header scroll


   let lastScrollTop = 0;

   window.addEventListener('scroll', function () {
      let currentScroll = window.scrollY || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
         // Scrolling down
         if (window.innerWidth <= 1024) {
            document.querySelector("header").style.top = "0px"; // Hide header
         }
         else {
            document.querySelector("header").style.top = "-75px"; // Hide header
            document.querySelector("header").style.position = "sticky";
         }

      } else {
         // Scrolling up
         document.querySelector('header').style.top = '0'; // Show header

      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
   });


   if (document.querySelector('#slider-id')) {
      // slider js start=

      function initializeGASlider(className, slidesPerView = 1, spaceBetween = 20) {
         // Define variables
         const sliderParent = document.querySelector('#' + className);
         const sliderWrap = sliderParent.querySelector('.slider-wrap');
         const slideCount = sliderWrap.querySelectorAll('.slide-card').length;
         let currentIndex = 0;

         // Update slidesPerView based on window width
         if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            slidesPerView = 1; // Display two slides on tablets
         } else if (window.innerWidth <= 600) {
            slidesPerView = 1; // Display one slide on mobile
         }

         // Calculate the width of the container
         const containerWidth = sliderWrap.offsetWidth;

         // Calculate the width of each slide based on the formula
         let slideWidth = (containerWidth / slidesPerView) - ((slidesPerView - 1) * spaceBetween / slidesPerView);

         // Function to go to the next slide
         function goToNextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSliderPosition();
            updateButtonState();
         }

         // Function to go to the previous slide
         function goToPrevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSliderPosition();
            updateButtonState();
         }

         // Function to update the slider position with slide effect
         function updateSliderPosition() {
            // Calculate the translate value for the current index
            const translateValue = -currentIndex * (slideWidth + spaceBetween);
            sliderWrap.style.transform = `translateX(${translateValue}px)`;
         }

         // Function to update the button states
         function updateButtonState() {
            // Enable or disable the "Previous" button based on the currentIndex
            if (currentIndex > 0) {
               sliderParent.querySelector('#previous-arrow').disabled = false;
            } else {
               sliderParent.querySelector('#previous-arrow').disabled = true;
            }

            // Enable or disable the "Next" button based on the currentIndex and slideCount
            if (window.innerWidth <= 600) {
               if (currentIndex < slideCount - 1) {
                  sliderParent.querySelector('#next-arrow').disabled = false;
               } else {
                  sliderParent.querySelector('#next-arrow').disabled = true;
               }
            } else {
               if ((slideCount - currentIndex - 1) < slidesPerView) {
                  sliderParent.querySelector('#next-arrow').disabled = true;
               } else {
                  sliderParent.querySelector('#next-arrow').disabled = false;
               }
            }

            // Disable the "Next" button if there are fewer slides than slides per view
            if (slideCount <= slidesPerView) {
               sliderParent.querySelector('#next-arrow').disabled = true;
            }
         }

         // Function to calculate slideWidth and spaceBetween
         function calculateSlideSize() {
            // Set the width and marginRight for each slide
            const slideCards = sliderWrap.querySelectorAll('.slide-card');
            for (let i = 0; i < slideCards.length; i++) {
               slideCards[i].style.width = slideWidth + 'px';
               slideCards[i].style.marginRight = spaceBetween + 'px';
            }

            // Update button states after calculating slide size
            updateButtonState();
         }

         // Initial calculation of slide size
         calculateSlideSize();

         // Recalculate slide size when the window is resized
         window.addEventListener('resize', calculateSlideSize);

         // Attach click events to navigation buttons
         sliderParent.querySelector('#next-arrow').addEventListener('click', function () {
            if (currentIndex < slideCount - 1) {
               goToNextSlide();
            }
         });

         sliderParent.querySelector('#previous-arrow').addEventListener('click', function () {
            if (currentIndex > 0) {
               goToPrevSlide();
            }
         });
      }

      initializeGASlider('slider-id', 1)

      // slider js end
   }

   const tableContainer = document.querySelector(".tableofcontent");
   const tableHeader = document.querySelector(".toc-header");
   const tableCrossBtn = document.querySelector(".toc-cross");
   const tableOfcontentBody = document.querySelector(".tableofcontent ul");

   // Function to check if it's a mobile device
   function isMobileDevice() {
      return window.innerWidth <= 768; // Adjust the width as needed
   }

   // Function to hide table of content on mobile devices
   function hideTableOfContentOnMobile() {
      if (isMobileDevice() && tableOfcontentBody) {
         tableOfcontentBody.classList.add("hidden");
         tableContainer.style.gap = "0px";
         tableCrossBtn.style.transform = "rotate(180deg)";
      }
   }

   // Initial check to hide on page load if it's a mobile device and tableOfcontentBody exists
   if (tableOfcontentBody) {
      hideTableOfContentOnMobile();

      if (tableHeader) {
         tableHeader.addEventListener("click", function () {
            if (tableOfcontentBody.classList.contains("hidden")) {
               tableOfcontentBody.classList.remove("hidden");
               tableCrossBtn.style.transform = "rotate(0deg)";
               tableContainer.style.gap = "10px";
            } else {
               tableOfcontentBody.classList.add("hidden");
               tableCrossBtn.style.transform = "rotate(180deg)"; // or "rotate(180deg)"
               tableContainer.style.gap = "0px";
            }
         });
      }

      // Check on window resize to adjust visibility
      window.addEventListener("resize", hideTableOfContentOnMobile);
   }


   // accordion js

   const detailsElements = document.querySelectorAll("details");
   const summaryElements = document.querySelectorAll("summary");
   summaryElements.forEach((summary, index) => {
      summary.addEventListener("click", () => {
         // Close other open details elements and remove 'active' class
         detailsElements.forEach((details, i) => {
            if (i !== index) {
               details.open = false;
            }
         });
         summaryElements.forEach((s, i) => {
            if (i !== index) {
               s.classList.remove("actives");
            }
         });
         // Toggle 'active' class on the clicked summary
         summary.classList.toggle("actives");
      });
   });




   const mybutton = document.getElementById("myBtn");

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

   // When the user clicks on the button, scroll to the top of the document
   mybutton.addEventListener("click", function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
   });


});




