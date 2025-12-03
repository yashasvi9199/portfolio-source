export const trackPageView = (path) => {
    if (window.gtag) {
        window.gtag('config', 'G-STRJLDTGXC', {
            page_path: path,
            cookie_domain: window.location.hostname,
            cookie_flags: 'SameSite=None;Secure'
        });
    }
};
