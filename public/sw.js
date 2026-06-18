// Service worker responsable to send notification daily at 22:00

// the self paramter it's a global variable from the browser
self.addEventListener("push", (event) => {
    if (!event.data) return
    
    try {
        const data = event.data.json()
    } catch (e) {
        data = { 
            title: 'Test Message', 
            body: event.data.text() 
        };
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon || "/trash.png",
            vibrate: [200, 100, 200],
            badge: "/trash.png"
        })
    )
})