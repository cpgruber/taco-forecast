(function () {
  console.log('fooooooo');
  const tilts = document.querySelectorAll('.tilt');

  tilts.forEach(el => {
    el.addEventListener('touchstart', () => {
      el.classList.add('clicked');
    });
    el.addEventListener('touchend', () => {
      tilts.forEach(e => e.classList.remove('clicked'));
    });
  });

}());
