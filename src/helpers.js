watchTrailerBtn.addEventListener('click', function () {
    modalVideoTrailer.classList.add('show');
    document.querySelector('html').style.overflow = 'hidden';
});

modalCloseBtn.addEventListener('click', function () {
    modalVideoTrailer.classList.remove('show');
    let video = iframeVideoTrailer.src;
    iframeVideoTrailer.src = '';
    iframeVideoTrailer.src = video;
    document.querySelector('html').style.overflow = 'auto';
})

function addScrollHeader() {
    if (window.scrollY > 0) {
        if (!header.classList.contains('scrolling')) {
            header.classList.add('scrolling');
        }
    } else {
        header.classList.remove('scrolling')
    }
}


window.addEventListener('scroll', addScrollHeader)

detailsBanner.addEventListener('click', function () {
    callNavigatorForDetails(detailsBanner.getAttribute('data-movie'))
})

paintInfoLanguage();

languageSelector.addEventListener("change", () => {
    language = languageSelector.value;
    localStorage.setItem('language', language);
    paintInfoLanguage()
    api.defaults.params.language = getLanguage(language).api;
    ischangeLanguage = true;
    navigator();
})

function paintInfoLanguage() {
    const options = languageSelector.options;
    Array.from(options).forEach((option) => {
        if (option.value == getLanguage(language).name) {
            option.selected = true;
        }
    })
    languageElements.forEach((elm) => {
        elm.innerText = elm.getAttribute(`data-${getLanguage(language).name}`)
    })
}


expandableBtn.addEventListener("click", () => {
    expandableMenu.classList.toggle('expandable');
})

logoContainer.addEventListener("click", () => {
    location.hash = '#';
});