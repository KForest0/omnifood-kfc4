///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

// 设置当前年份
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// 使移动端导航栏工作
const btnNav = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
btnNav.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

// 锚点平滑动画
const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // 滚回顶部
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    // 滚向其他链接
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
    // 关闭移动导航
    if (link.classList.contains('main-nav-link'))
      headerEl.classList.toggle('nav-open');
  })
});

// Sticky Navigation
const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      console.log(ent);
      document.body.classList.add('sticky');
    }
    if (ent.isIntersecting) {
      document.body.classList.remove('sticky');
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px'
  }
);
obs.observe(sectionHeroEl);

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

