const infiniteScroll = function() {
    let infoCafe = document.querySelector('.info__cafe:last-child');

    const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            io.unobserve(infoCafe);

            infoCafe = document.querySelector('.info__cafe:last-child');

            io.observe(infoCafe);
        }
    }, {
        threshold: 1
    });

    io.observe(infoCafe);
}
