import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const download = document.querySelector('.download-wrapper');
const downloadTrigger = document.querySelector('.download-contentTrigger');
const timelineWrapper = document.querySelector('.timeline-wrapper');
const milestones = Array.from(document.querySelectorAll('.milestone'));
const timelineDates = Array.from(document.querySelectorAll('.timeline-date'));
const backgroundTriggers = Array.from(document.querySelectorAll('.btrigger'));
const backOverlays = Array.from(document.querySelectorAll('.backOverlay'));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');


function handleDownload(e) {
	e.preventDefault();
	download.classList.toggle('active');
  this.classList.toggle('active');
  if (this.classList.contains('active')) {
    this.setAttribute('aria-expanded', 'true');
  } else {
    this.setAttribute('aria-expanded', 'false');
  }		
}

function handleDateClick(e) {
  if (!prefersReducedMotion.matches) {
    	e.preventDefault();
    	let url = this.getAttribute('href');
    	let date = document.getElementById(url);
    	gsap.to(window, {duration: 3, scrollTo: {y: date, offsetY: 75}, ease: "power3.out"});
  }
  return true;
}

function handleScroll() {
	let distanceScrolled = window.pageYOffset;

	if (!download.classList.contains('fixed') && distanceScrolled > (download.offsetTop + download.parentElement.offsetTop) - 75) {
		download.classList.add('fixed');
		download.firstElementChild.classList.add('fixed');
	} else if (download.classList.contains('fixed') && distanceScrolled < (download.offsetTop + download.parentElement.offsetTop) - 75) {
		download.classList.remove('fixed');
		download.firstElementChild.classList.remove('fixed');
	}

	if (!timelineWrapper.classList.contains('fixed') && distanceScrolled > (timelineWrapper.offsetTop + timelineWrapper.parentElement.offsetTop) - 75) {
		timelineWrapper.classList.add('fixed');
		timelineWrapper.firstElementChild.classList.add('fixed');
	} else if (timelineWrapper.classList.contains('fixed') && distanceScrolled < (timelineWrapper.offsetTop + timelineWrapper.parentElement.offsetTop) - 75) {
		timelineWrapper.classList.remove('fixed');
		timelineWrapper.firstElementChild.classList.remove('fixed');
	}

	milestones.forEach((milestone,index) => {
		if (!milestone.classList.contains('scrolled') && index == 0 && distanceScrolled > milestone.offsetTop + milestone.parentElement.offsetTop + milestone.parentElement.offsetParent.offsetTop + milestone.parentElement.offsetParent.parentElement.offsetTop - (window.innerHeight / 2)) {
			let ariaCurrent = document.createAttribute('aria-current');
      ariaCurrent.value = 'date';
      milestone.classList.add('scrolled');
			timelineDates[index].classList.add('active');
      timelineDates[index].setAttributeNode(ariaCurrent);
		} else if (!milestone.classList.contains('scrolled') && index !== 0 && distanceScrolled > milestone.offsetTop + milestone.parentElement.offsetTop + milestone.parentElement.offsetParent.offsetTop + milestone.parentElement.offsetParent.parentElement.offsetTop - (window.innerHeight / 2)) {
			let activeMarker = document.querySelector('.timeline-date.active');
      let ariaCurrent = document.createAttribute('aria-current');
      ariaCurrent.value = 'date';
			milestone.classList.add('scrolled');
			activeMarker.classList.remove('active');
      activeMarker.removeAttribute('aria-current');
			timelineDates[index].classList.add('active');
      timelineDates[index].setAttributeNode(ariaCurrent);
		} else if (milestone.classList.contains('scrolled') && index !== 0 && distanceScrolled < milestone.offsetTop + milestone.parentElement.offsetTop + milestone.parentElement.offsetParent.offsetTop + milestone.parentElement.offsetParent.parentElement.offsetTop - (window.innerHeight / 2)) {
			let activeMarker = document.querySelector('.timeline-date.active');
      let ariaCurrent = document.createAttribute('aria-current');
      ariaCurrent.value = 'date';
			milestone.classList.remove('scrolled');
			activeMarker.classList.remove('active');
      activeMarker.removeAttribute('aria-current');
			timelineDates[index - 1].classList.add('active');
      timelineDates[index - 1].setAttributeNode(ariaCurrent);
		} else if (milestone.classList.contains('scrolled') && index == 0 && distanceScrolled < milestone.offsetTop + milestone.parentElement.offsetTop + milestone.parentElement.offsetParent.offsetTop + milestone.parentElement.offsetParent.parentElement.offsetTop - (window.innerHeight / 2)) {
      let activeMarker = document.querySelector('.timeline-date.active');
      milestone.classList.remove('scrolled');
      activeMarker.classList.remove('active');
      activeMarker.removeAttribute('aria-current');
    }
	})

  backgroundTriggers.forEach((trigger,index) => {
      if (!trigger.classList.contains('triggered') && distanceScrolled > trigger.offsetTop + trigger.parentElement.offsetTop + trigger.parentElement.offsetParent.offsetTop + trigger.parentElement.offsetParent.parentElement.offsetTop) {
          trigger.classList.add('triggered');
          backOverlays[index].style.opacity = '1';
      } else if (trigger.classList.contains('triggered') && distanceScrolled < trigger.offsetTop + trigger.parentElement.offsetTop + trigger.parentElement.offsetParent.offsetTop + trigger.parentElement.offsetParent.parentElement.offsetTop) {
          trigger.classList.remove('triggered');
          backOverlays[index].style.opacity = '0';
;      }
  })
}

window.addEventListener('scroll', handleScroll);

for (let i = 0; i < timelineDates.length; i++) {
	timelineDates[i].addEventListener('click', handleDateClick);
}

downloadTrigger.addEventListener('click', handleDownload);

gsap.to(["#t-cell", "#d-cell"], {
  y: window.innerHeight / 2.5,
  rotation: 90,
  scrollTrigger: {
    trigger: ".animTrig",
    start: "top center",
    endTrigger: ".animTrig-2",
    end: "bottom center",
    scrub: true
  }
});

// gsap.to("#d-cell", {
//   y: window.innerHeight / 2.5,
//   rotation: 90,
//   scrollTrigger: {
//     trigger: ".animTrig",
//     start: "top center",
//     endTrigger: ".animTrig-2",
//     end: "bottom center",
//     scrub: true
//   }
// });

gsap.to("#t-cell", {
  opacity: "0",
  scrollTrigger: {
    trigger: ".animTrig-2",
    start: "bottom center",
    end: "+=350",
    scrub: true
  }
});

gsap.to("#d-cell", {
  opacity: "1",
  scrollTrigger: {
    trigger: ".animTrig-2",
    start: "bottom center",
    end: "+=350",
    scrub: true
  }
});

gsap.to(["#p-cell-a", "#p-cell-b"], {
  opacity: "1",
  scrollTrigger: {
    trigger: ".animTrig-3",
    start: "top center",
    end: "+=350",
    scrub: true
  }
});

// gsap.to("#p-cell-b", {
//   opacity: "1",
//   scrollTrigger: {
//     trigger: ".animTrig-3",
//     start: "top center",
//     end: "+=350",
//     scrub: true
//   }
// });

gsap.to(["#anti-a", "#anti-b", "#anti-c"], {
  opacity: "1",
  scrollTrigger: {
    trigger: ".animTrig-3",
    start: "top center",
    end: "+=350",
    scrub: true
  }
});

gsap.to("#p-cell-a", {
  y: -window.innerHeight / 1.35,
  rotation: 180,
  scrollTrigger: {
    trigger: ".animTrig-4",
    start: "top center",
    endTrigger: ".animTrig-5",
    end: "top center",
    scrub: true
  }
});

gsap.to("#p-cell-b", {
  x: 300,
  y: -window.innerHeight / 1.2,
  rotation: -135,
  scrollTrigger: {
    trigger: ".animTrig-4",
    start: "top center",
    endTrigger: ".animTrig-5",
    end: "top center",
    scrub: true
  }
});

gsap.to("#anti-a", {
  x: -200,
  y: -window.innerHeight / 1.35,
  rotation: 360,
  scrollTrigger: {
    trigger: ".animTrig-4",
    start: "top center",
    endTrigger: ".animTrig-8",
    end: "bottom center",
    scrub: true
  }
});

gsap.to("#anti-b", {
  x: window.innerWidth / 2,
  y: -window.innerHeight / 1.35,
  rotation: -360,
  scrollTrigger: {
    trigger: ".animTrig-4",
    start: "top center",
    endTrigger: ".animTrig-8",
    end: "bottom center",
    scrub: true
  }
});

gsap.to("#anti-c", {
  x: window.innerWidth / 2,
  y: 400,
  rotation: 360,
  scrollTrigger: {
    trigger: ".animTrig-4",
    start: "top center",
    endTrigger: ".animTrig-8",
    end: "bottom center",
    scrub: true
  }
});

gsap.to("#p-cell-c", {
  x: 240,
  rotation: -90,
  opacity: "1",
  scrollTrigger: {
    trigger: ".animTrig-6",
    start: "top center",
    endTrigger: ".animTrig-7",
    end: "bottom center",
    scrub: true
  }
});

gsap.to("#t-cell-b", {
  x: -240,
  rotation: 135,
  opacity: "1",
  scrollTrigger: {
    trigger: ".animTrig-6",
    start: "top center",
    endTrigger: ".animTrig-7",
    end: "bottom center",
    scrub: true
  }
});


