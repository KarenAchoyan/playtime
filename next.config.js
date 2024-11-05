const nextConfig = {
    images: {
        domains: ['playtime.dahk.am'],
    },
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'hy', 'ru'],
        defaultLocale: 'hy',
        localeDetection: false
    },
    env: {
        API_URL: "https://playtime.dahk.am/api",
        IMAGE_URL: "https://playtime.dahk.am/storage/",
        IMAGE_URL2: "https://playtime.dahk.am/",
    },
}


module.exports = nextConfig
