(() => {
  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");
  const frameCount = 140;
  const images = [];
  let isMobile = false;

  // Check if the user is on a mobile device
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    isMobile = true;
  }

  const buds = {
    frame: 0,
  };

  // Adjust canvas size for mobile
  canvas.width = isMobile ? window.innerWidth : 1920;
  canvas.height = isMobile ? window.innerHeight : 1080;

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/animation_${(i + 1000).toString().padStart(4, "0")}.jpg`;
    images.push(img);
  }

  gsap.to(buds, {
    frame: 139,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      start: "top top",
    },
    onUpdate: render,
  });

  images[0].onload = render;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0, canvas.width, canvas.height);
  }

  // Update canvas size on window resize (for mobile responsiveness)
  window.addEventListener("resize", () => {
    if (isMobile) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    }
  });
})();




(() => {
  console.log("IIFE Fired");
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const InfoBoxes = [{
          title: "Touch sensitive controls",
          text: "touch to control play, pause, stop and skip",
      },
      {
          title: "+24 hrs battery backup",
          text: "long lasting music playback",
          image: "images/battery.png",

      },
      {
          title: "Noise cancelling mic",
          text: "blocks outside noise with new AI powered software",
      },
      {
          title: "Fast charging",
          text: "full charge in under 30 minutes",
      },
      {
          title: "Earpiece",
          text: "confort fit for every ear type",
      },
  ];

  function modelLoaded() {
      hotspots.forEach((hotspot) => {
          hotspot.style.display = "block";
      });
  }

  function loadInfo() {
      InfoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          if (selected) {
              const titleElement = document.createElement("h2");
              titleElement.textContent = infoBox.title;
              titleElement.style.color = "#9cacac";
              titleElement.style.fontSize = "20px"; 
      titleElement.style.fontSize = "20px"; 
      // titleElement.style.fontFamily = "FontFamily"; 


      
              const textElement = document.createElement("p");
              textElement.textContent = infoBox.text;

              textElement.style.color = "#161616";

 textElement.style.fontSize = "16px"; 

              selected.appendChild(titleElement);
              selected.appendChild(textElement);



/*this chunk of code is AI generated. Encounterd bugs while adding images to the info box*/
              if (infoBox.image) {
                  const imgElement = document.createElement("images");
                  imgElement.src = infoBox.image;
                  imgElement.classList.add("hotspot-image");
                  selected.appendChild(imgElement);
              }




          } else {
              console.log(`#hotspot-${index + 1} not found`);
          }
      });
  }


  loadInfo();

  function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, {
          duration: 0.5,
          autoAlpha: 1,
          visibility: "visible"
      });
  }

  function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, {
          duration: 0.5,
          autoAlpha: 0,
          visibility: "hidden"
      });
  }


  // event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function(hotspot) {
      hotspot.addEventListener("mouseover", showInfo);
      hotspot.addEventListener("mouseout", hideInfo);


  });
})();



document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.promo .fade');

  function checkVisibility() {
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect();

      // Check if the element is in the viewport
      if (elementPosition.top < window.innerHeight && elementPosition.bottom >= 0) {
        element.style.opacity = 1;
      } else {
        element.style.opacity = 0;
      }
    });
  }

  // Initial check
  checkVisibility();

  // Listen for scroll events
  window.addEventListener('scroll', checkVisibility);
});


// Add this JavaScript to handle the scroll and apply the class dynamically
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    const infotext = document.querySelector(".infotext");
    const infotextOffset = infotext.offsetTop;
    const infotextHeight = infotext.clientHeight;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Check if the infotext section is in the viewport
    if (
      scrollPosition > infotextOffset - windowHeight + infotextHeight * 0.5 &&
      scrollPosition < infotextOffset + infotextHeight - infotextHeight * 0.5
    ) {
      infotext.classList.add("show");
    } else {
      infotext.classList.remove("show");
    }
  });
});




















(() => {
  (function(){
      "use strict";
  
  
  var imageCon = document.querySelector('#imageCon'),
      drag = document.querySelector('.image-drag'),
      left = document.querySelector('.image-left'),
      dragging = false,
      min = 0,
      max = imageCon.offsetWidth;
      //The HTMLElement.offsetWidth read-only property returns the layout width of an element. 
  
  function onDown() {
    dragging = true;
  }
  
  function onUp() {
    dragging = false;
  }
  
  function onMove(event) {
    if(dragging===true) {
      var x = event.clientX - imageCon.getBoundingClientRect().left;
      //The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred
      //The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
      //X-coordinate, relative to the viewport origin, of the left of the rectangle box. Read only
      console.log(event.clientX);
      console.log(imageCon.getBoundingClientRect().left);
    //need logic to keep slider in box
      if(x < min) { //if x less than 0
        x = min;    //set x = 0
      }
     else if(x > max) { //otherwise if x is greater than 900
        x = max-4; //set x to equal the max width minus 2 (width of slider)
      }
      drag.style.left = x + 'px';
      left.style.width = x + 'px';
    }
  }
  
  drag.addEventListener('mousedown', onDown, false); 
  //add listener to actual drag div, if user clicks on it
  //drag.addEventListener('touchstart', onDown);
  document.body.addEventListener('mouseup', onUp, false);
  //document.body.addEventListener('mo', onUp);
  document.body.addEventListener('mousemove', onMove, false);
  //document.body.addEventListener('touchmove', onMove);
  
  })();
  
  
  /*231-187.5 = 43.5.  43.5 is how much of the car is left showing*/
  
  /*
  The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred (as opposed to the coordinates within the page). For example, clicking in the top-left corner of the client area will always result in a mouse event with a clientX value of 0, regardless of whether the page is scrolled horizontally.
  */


})();


