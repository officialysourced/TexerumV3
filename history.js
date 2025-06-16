function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

document.addEventListener('DOMContentLoaded', () => {
    const launchAboutBlankBtn = document.getElementById('launchAboutBlankBtn');
    if (launchAboutBlankBtn) {
        launchAboutBlankBtn.addEventListener('click', () => {
            window.open('about:blank', '_blank');
        });
    }

    const overrideUrlInput = document.getElementById('overrideUrlInput');
    const setOverrideUrlBtn = document.getElementById('setOverrideUrlBtn');
    const clearOverrideUrlBtn = document.getElementById('clearOverrideUrlBtn');

    const savedOverrideUrl = localStorage.getItem('historyOverrideUrl');
    if (savedOverrideUrl && overrideUrlInput) {
        overrideUrlInput.value = savedOverrideUrl;
    }

    if (setOverrideUrlBtn) {
        setOverrideUrlBtn.addEventListener('click', () => {
            const url = overrideUrlInput.value.trim();
            if (url) {
                try {
                    new URL(url); 
                    window.history.replaceState({}, '', url);
                    localStorage.setItem('historyOverrideUrl', url);
                    alert('Browser history URL has been overridden!');
                } catch (e) {
                    alert('Please enter a valid URL (e.g., https://example.com).');
                }
            } else {
                alert('Please enter a URL to override.');
            }
        });
    }

    if (clearOverrideUrlBtn) {
        clearOverrideUrlBtn.addEventListener('click', () => {
            window.history.replaceState({}, '', window.location.href);
            localStorage.removeItem('historyOverrideUrl');
            if (overrideUrlInput) {
                overrideUrlInput.value = '';
            }
            alert('Browser history override cleared.');
        });
    }
});