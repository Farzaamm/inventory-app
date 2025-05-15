const index = (req, res) => {
    res.render('pages/index', { title: 'Home' });
}
const about = (req, res) => {
    res.render('pages/about', { title: 'About' });
}
const contact = (req, res) => {
    res.render('pages/contact', { title: 'Contact' });
}
const services = (req, res) => {
    res.render('pages/services', { title: 'Services' });
}

module.exports = {
    index,
    about,
    contact,
    services
}