"use strict";

// ***** animate landing transition *****
const LANDING_BTN = document.querySelector(".view-portfolio-text");
if (LANDING_BTN) {
  LANDING_BTN.addEventListener(
    "click",
    () => {
      let dropLines = document.querySelectorAll(".drop-line");
      dropLines.forEach((line, i) => line.classList.add(`drop-line--${i + 1}`));
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight + 10,
          left: 0,
          behavior: "auto",
        });
      }, 500);
      setTimeout(() => {
        dropLines.forEach((line, i) =>
          line.classList.remove(`drop-line--${i + 1}`)
        );
      }, 3000);
    },
    false
  );
}

// ***** set nav open state *****
let navOpen = false;

// ***** dropdown on hamburger click *****
const navDropdown = (bool) => {
  const DROPDOWN = document.querySelector(".dropdown-back");
  bool ? (DROPDOWN.style.top = "0px") : (DROPDOWN.style.top = "-450px");
};

// ***** animate dropdown elements *****
const animateDropdownElements = (bool) => {
  // dropdown shape
  const SHAPE = document.querySelector(".dropdown-shape");
  if (bool) {
    SHAPE.style.bottom = "0";
  } else {
    setTimeout(() => {
      SHAPE.style.bottom = "-380px";
    }, 50);
  }

  // dropdown list
  const LIST_ITEMS = document.querySelectorAll(".mobile-li");
  if (bool) {
    let i = 0;
    function flyIn() {
      setTimeout(() => {
        if (i < LIST_ITEMS.length) {
          LIST_ITEMS[i].style.transform = "translateX(-50%)";
          i++;
          flyIn();
        }
      }, 100);
    }
    flyIn();
  } else {
    LIST_ITEMS.forEach((item) => (item.style.transform = "translateX(-300%)"));
  }
};

// ***** add event listener to hamburger *****
const NAV_BUTTON = document.querySelector(".nav-hamburger");
NAV_BUTTON.addEventListener(
  "click",
  () => {
    navOpen = !navOpen;
    if (navOpen) {
      document
        .querySelectorAll(".bar")
        .forEach((bar) => bar.classList.add("open"));
    } else {
      document
        .querySelectorAll(".bar")
        .forEach((bar) => bar.classList.remove("open"));
    }
    navDropdown(navOpen);
    animateDropdownElements(navOpen);
  },
  false
);

// ***** hide nav on scroll *****
window.addEventListener(
  "scroll",
  () => {
    navOpen
      ? ((navOpen = !navOpen),
        navDropdown(navOpen),
        document
          .querySelectorAll(".bar")
          .forEach((bar) => bar.classList.remove("open")))
      : null;
  },
  false
);

// ***** shrink navbar on scroll *****
const WINDOW_HEIGHT = window.innerHeight;
const NAVBAR = document.querySelector(".nav-background");
const SMALL_LOGO = document.querySelector(".small-logo-container");
if (document.querySelector("#blog-posts") !== null) {
  document.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > WINDOW_HEIGHT) {
        SMALL_LOGO.style.opacity = "1";
        NAVBAR.style.top = "0";
        NAV_BUTTON.style.opacity = "1";
      } else {
        SMALL_LOGO.style.opacity = "0";
        NAVBAR.style.top = "-70px";
        NAV_BUTTON.style.opacity = "0";
      }
    },
    false
  );
} else if (document.querySelector("#blog-list") !== null) {
  SMALL_LOGO.style.opacity = "1";
  NAVBAR.style.top = "0";
  NAV_BUTTON.style.opacity = "1";
}

// ***** scroll to top button *****
document.querySelector(".back-to-top").addEventListener(
  "click",
  () => {
    if (document.querySelector("#blog-posts") !== null) {
      window.scrollTo({ top: window.innerHeight + 1, behavior: "smooth" });
    } else if (document.querySelector("#blog-list") !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
  false
);

// ***** animate language bars on scroll *****
const LANGUAGE_STATS = [
  { language: "HTML", score: 7 },
  { language: "CSS", score: 7 },
  { language: "JavaScript", score: 6 },
  { language: "React", score: 5 },
  { language: "Node.js", score: 2 },
  { language: "Inkscape", score: 7 },
  { language: "Figma", score: 5 },
];

const PLACEHOLDERS = document.querySelectorAll(".placeholder");
if (PLACEHOLDERS.length > 0) {
  let j = 0;
  LANGUAGE_STATS.forEach((lang) => {
    for (let i = 0; i < lang.score; i++) {
      const SCORE_BLOCK = document.createElement("div");
      SCORE_BLOCK.classList.add("score-block");
      SCORE_BLOCK.classList.add(`score-block-${i + 1}`);
      PLACEHOLDERS[j].appendChild(SCORE_BLOCK);
      j++;
    }
    j += 10 - lang.score;
  });
}

window.addEventListener(
  "scroll",
  () => {
    const SCORE_BLOCKS = document.querySelectorAll(".score-block");
    if (window.scrollY >= 900) {
      SCORE_BLOCKS.forEach((elem, i) => {
        setTimeout(() => {
          elem.style.height = "100%";
        }, i * 40);
      });
    }
  },
  false
);

// ***** dynamic class based on img orientation *****
const imgOrientation = (imgURL) => {
  const img = new Image();
  img.src = imgURL;
  if (img.width > img.height) {
    return "landscape";
  } else if (img.height > img.width) {
    return "portrait";
  } else if (img.height === img.width) {
    return "square";
  }
};

// ***** dynamically generate blog post windows *****
const createPostWindow = (post, containerId) => {
  let postContainer = document.createElement("div");
  postContainer.classList.add("blog-short-container");

  let postLink = document.createElement("a");
  postLink.href = `/${post.slug}.html`;
  postContainer.appendChild(postLink);

  let blogImageContainer = document.createElement("div");
  blogImageContainer.classList.add("blog-short-image");
  postLink.appendChild(blogImageContainer);

  let blogImage = document.createElement("img");
  blogImage.src = post.metadata.post_image.imgix_url;
  blogImage.classList.add(imgOrientation(post.metadata.post_image.imgix_url));
  blogImageContainer.appendChild(blogImage);

  let blogHead = document.createElement("div");
  blogHead.classList.add("blog-short-head");
  postLink.appendChild(blogHead);

  let blogHeader = document.createElement("h2");
  blogHeader.innerText = post.title;
  blogHead.appendChild(blogHeader);

  let postDateContainer = document.createElement("div");
  postDateContainer.classList.add("blog-post-date");
  blogHead.appendChild(postDateContainer);

  for (let i = 0; i < 6; i++) {
    let dateDigit = document.createElement("div");
    dateDigit.classList.add("post-date");
    postDateContainer.appendChild(dateDigit);
    let date = post.metadata.post_date;
    switch (i) {
      case 0:
        dateDigit.innerText = date.charAt(8);
        dateDigit.classList.add("b-d-digit-1");
        break;
      case 1:
        dateDigit.innerText = date.charAt(9);
        dateDigit.classList.add("b-d-digit-2");
        break;
      case 2:
        dateDigit.innerText = date.charAt(5);
        dateDigit.classList.add("b-m-digit-1");
        break;
      case 3:
        dateDigit.innerText = date.charAt(6);
        dateDigit.classList.add("b-m-digit-2");
        break;
      case 4:
        dateDigit.innerText = date.charAt(2);
        dateDigit.classList.add("b-y-digit-1");
        break;
      case 5:
        dateDigit.innerText = date.charAt(3);
        dateDigit.classList.add("b-y-digit-2");
        break;
    }
  }

  let horizontalRule = document.createElement("div");
  horizontalRule.classList.add("blog-short-divide");
  postLink.appendChild(horizontalRule);
  let bar1 = document.createElement("div");
  horizontalRule.appendChild(bar1);

  let blogBlurbContainer = document.createElement("div");
  blogBlurbContainer.classList.add("blog-short-blurb");
  blogBlurbContainer.innerHTML = post.content;
  postLink.appendChild(blogBlurbContainer);

  document.querySelector(`#${containerId}`).appendChild(postContainer);
};

// ***** fetch blog post data *****
const KEY = "N6C2ydBXJRnJGr5xKPQfW16ea2qANsnZoNgLzW5hXvAUIjN8FY";
const ENDPOINT = `https://api.cosmicjs.com/v1/mwwdd-blog/objects?pretty=true&hide_metafields=true&type=blogposts&read_key=${KEY}&limit=20&props=slug,title,content,metadata,`;

const fetchData = () => {
  fetch(ENDPOINT)
    .then((res) => res.json())
    .then((data) => {
      if (document.querySelector("#blog-posts") !== null) {
        data.objects.forEach((post, i) => {
          i < 3 ? createPostWindow(post, "blog-posts") : null;
        });
      } else if (document.querySelector("#blog-list") !== null) {
        data.objects.forEach((post, i) => {
          createPostWindow(post, "blog-list");
        });
      }
    })
    .catch((err) => console.log("Error:", err));
};
fetchData();

// ***** project container slide in *****
const PROJECTS = document.querySelectorAll(".project-container");
window.addEventListener(
  "scroll",
  () => {
    PROJECTS.forEach((elem) => {
      let elementOnPage =
        elem.getBoundingClientRect().bottom -
        window.innerHeight -
        elem.getBoundingClientRect().height;
      if (elementOnPage < -20) {
        elem.style.left = "50%";
        elem.style.transform = "translate(-50%)";
        elem.style.opacity = "1";
      }
    });
  },
  false
);
