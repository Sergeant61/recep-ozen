window.onscroll = function () {
  const brdNavbar = document.getElementById('brdNavbar');

  if (!brdNavbar) {
    return
  }
  
  if (document.documentElement.scrollTop >= 104) {
    brdNavbar.classList.add('brd-navbar-scrolled');
  } else {
    brdNavbar.classList.remove('brd-navbar-scrolled');
  }
};