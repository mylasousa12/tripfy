export default defineNuxtConfig({
    routeRules: {
        '/':{redirect: '/home'}
    },
    app: {
        head: {
            title: 'Tripfy',
            link: [
                { rel: 'icon', type: 'image/png', href: '/logo1.png' }
            ]
        }
    }
})