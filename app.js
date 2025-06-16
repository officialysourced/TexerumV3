function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

function openInAboutBlank(urlToLoad) {
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
        const iframeContent = `
            <!DOCTYPE html>
            <html style="margin:0;height:100%;">
            <head>
                <title>Loading...</title>
                <style>
                    body { margin: 0; padding: 0; overflow: hidden; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #1a1a1a; }
                    iframe { border: none; width: 100vw; height: 100vh; }
                </style>
            </head>
            <body>
                <iframe src="${urlToLoad}"></iframe>
            </body>
            </html>
        `;
        newWindow.document.write(iframeContent);
        newWindow.document.close();
    } else {
        console.error("Popup blocked. Please allow popups for this site to use about:blank cloaking.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const launchAboutBlankBtn = document.getElementById('launchAboutBlankBtn');
    const autoLaunchToggle = document.getElementById('autoLaunchToggle');

    if (launchAboutBlankBtn) {
        launchAboutBlankBtn.addEventListener('click', () => {
            openInAboutBlank(window.location.href);
        });
    }

    if (autoLaunchToggle) {
        const autoLaunchEnabled = localStorage.getItem('autoLaunchAboutBlank') === 'true';
        autoLaunchToggle.checked = autoLaunchEnabled;

        if (autoLaunchEnabled && window.location.href.indexOf('about:blank') === -1 && window.self === window.top) {
            openInAboutBlank(window.location.href);
        }

        autoLaunchToggle.addEventListener('change', () => {
            localStorage.setItem('autoLaunchAboutBlank', autoLaunchToggle.checked);
        });
    }
});
