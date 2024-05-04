import PhotoSwipeLightbox from 'photoswipe/lightbox';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#ps-gallery--home',
    children: 'a.artLink',
    pswpModule: () => import('photoswipe'),
});
lightbox.init();

const closeAllModals = () => {
    document.querySelectorAll('.detailModal').forEach(e => {
        e.removeAttribute('open');
    });
};

document.querySelector('main').addEventListener('click', closeAllModals);

console.log('🫖🫖🫖🫖🫖🫖🫖🫖🫖🫖🫖');

document
    .querySelectorAll('.closeButton')
    .forEach(e => e.addEventListener('click', closeAllModals));

document
    .querySelectorAll('.detailModal a')
    .forEach(e => e.addEventListener('click', closeAllModals));
