
  const allVenues = gsap.utils.toArray(".venues-item");
  const venueImageWrap = document.querySelector(".venues-img-wrap");
  const venueImage = document.querySelector(".venues-img");

  function initVenues() {
    allVenues.forEach((link) => {
      link.addEventListener("mouseenter", venueHover);
      link.addEventListener("mouseleave", venueHover);
      link.addEventListener("mousemove", moveVenueImage);
    });
  }

  function moveVenueImage(e) {
    let xpos = e.clientX;
    let ypos = e.clientY;
    const tl = gsap.timeline();
    tl.to(venueImageWrap, {
      x: xpos,
      y: ypos
    });
  }

  function venueHover(e) {
    if (e.type === "mouseenter") {
      const targetImage = e.target.dataset.img;

      const t1 = gsap.timeline();
      t1.set(venueImage, {
        backgroundImage: `url(${targetImage})`
      }).to(venueImageWrap, {
        duration: 0.5,
        autoAlpha: 1
      });
    } else if (e.type === "mouseleave") {
      const tl = gsap.timeline();
      tl.to(venueImageWrap, {
        duration: 0.5,
        autoAlpha: 0
      });
    }
  }

  function init() {
    initVenues();
  }

  init();