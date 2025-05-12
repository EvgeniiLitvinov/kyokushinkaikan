document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');
  const closeModalBtn = modal.querySelector('.close-modal');
  const form = modal.querySelector('form');
  const pageWrapper = document.getElementById('page-wrapper');

  const openModalButtons = document.querySelectorAll('button.open-modal, .hero .btn-dark');

  let lastFocusedElement = null;
  let scrollPosition = 0;

  const lockScroll = () => {
    scrollPosition = window.pageYOffset;
    pageWrapper.classList.add('scroll-lock');
    pageWrapper.style.top = `-${scrollPosition}px`;
  };

  const unlockScroll = () => {
    pageWrapper.classList.remove('scroll-lock');
    pageWrapper.style.top = '';
    window.scrollTo(0, scrollPosition);
  };

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      modal.classList.add('active');
    });
    lockScroll();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modalContent.classList.add('closing');

    if (lastFocusedElement) {
      lastFocusedElement.blur();
      lastFocusedElement = null;
    }

    document.body.setAttribute('tabindex', '-1');
    document.body.focus();
    setTimeout(() => {
      document.body.removeAttribute('tabindex');
    }, 10);

    setTimeout(() => {
      modal.style.display = 'none';
      modalContent.classList.remove('closing');
      unlockScroll();
    }, 300);
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeModalBtn.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
    form.reset();
  });
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const scrollY = window.scrollY;

  // Добавим класс при прокрутке
  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Проверка цвета секции под шапкой
  const sections = document.querySelectorAll('section');
  const headerHeight = header.offsetHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
      if (section.classList.contains('alt')) {
        header.classList.add('on-light');
      } else {
        header.classList.remove('on-light');
      }
    }
  });
});
