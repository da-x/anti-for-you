const DEFAULT_SETTINGS = {
  youtube: {
    hideHome: true,
    hideShorts: true
  }
};

function saveSettings() {
  const settings = {
    youtube: {
      hideHome: document.getElementById('youtube-home').checked,
      hideShorts: document.getElementById('youtube-shorts').checked
    }
  };

  chrome.storage.sync.set({ settings }, () => {
    const status = document.getElementById('status');
    status.classList.add('show');
    setTimeout(() => status.classList.remove('show'), 1500);
  });
}

function loadSettings() {
  chrome.storage.sync.get({ settings: DEFAULT_SETTINGS }, (data) => {
    document.getElementById('youtube-home').checked = data.settings.youtube.hideHome;
    document.getElementById('youtube-shorts').checked = data.settings.youtube.hideShorts;
  });
}

document.addEventListener('DOMContentLoaded', loadSettings);

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', saveSettings);
});
