// ----------------------------------------------------
// Lightbox Gallery Carousel
// Credits: Adapted from Vanilla JS Lightbox Carousel under MIT License.
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  (function() {
    var galleryTriggers = document.querySelectorAll('.gallery-trigger');
    if (galleryTriggers.length === 0) return;

    // Create Modal elements dynamically
    var modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.innerHTML = 
      '<div class="lightbox-content">' +
        '<button class="lightbox-btn lightbox-close" aria-label="Close">X</button>' +
        '<div class="lightbox-img-wrapper">' +
          '<div class="lightbox-loader">LOADING...</div>' +
          '<img class="lightbox-img" src="" alt="Gallery Image">' +
        '</div>' +
        '<button class="lightbox-btn lightbox-prev" aria-label="Previous">&lt;</button>' +
        '<button class="lightbox-btn lightbox-next" aria-label="Next">&gt;</button>' +
        '<div class="lightbox-counter"></div>' +
      '</div>';

    document.body.appendChild(modal);

    var img = modal.querySelector('.lightbox-img');
    var counter = modal.querySelector('.lightbox-counter');
    var prevBtn = modal.querySelector('.lightbox-prev');
    var nextBtn = modal.querySelector('.lightbox-next');
    var closeBtn = modal.querySelector('.lightbox-close');

    var currentGallery = [];
    var currentIndex = 0;

    function showImage(index) {
      if (index < 0 || index >= currentGallery.length) return;
      currentIndex = index;
      
      var wrapper = modal.querySelector('.lightbox-img-wrapper');
      wrapper.classList.add('loading');
      wrapper.classList.remove('vertical');
      img.classList.remove('loaded');
      img.src = currentGallery[currentIndex];
      
      img.onload = function() {
        wrapper.classList.remove('loading');
        img.classList.add('loaded');
        
        // Dynamic orientation detection
        if (img.naturalHeight > img.naturalWidth) {
          wrapper.classList.add('vertical');
        }
      };

      img.onerror = function() {
        wrapper.classList.remove('loading');
      };

      counter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
    }

    function openLightbox(galleryImages, startIndex) {
      currentGallery = galleryImages;
      showImage(startIndex);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent page scroll
    }

    function closeLightbox() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        var images = this.getAttribute('data-gallery').split(',').map(function(s) { return s.trim(); });
        if (images.length > 0 && images[0] !== '') {
          openLightbox(images, 0);
        }
      });
    });

    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = currentGallery.length - 1;
      showImage(newIndex);
    });

    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var newIndex = currentIndex + 1;
      if (newIndex >= currentGallery.length) newIndex = 0;
      showImage(newIndex);
    });

    closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn.click();
      }
    });
  })();
});
