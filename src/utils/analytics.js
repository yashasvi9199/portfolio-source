export const trackPageView = (path) => {
    if (window.gtag) {
        window.gtag('config', 'G-STRJLDTGXC', {
            page_path: path,
        });
    }
};
