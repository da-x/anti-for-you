const DEFAULT_SETTINGS = {
  youtube: {
    hideHome: true,
    hideShorts: true
  },
  x: {
    hideForYou: true,
    hideWhatsHappening: true,
    hideTodaysNews: true
  }
};

function saveSettings() {
  const settings = {
    youtube: {
      hideHome: document.getElementById('youtube-home').checked,
      hideShorts: document.getElementById('youtube-shorts').checked
    },
    x: {
      hideForYou: document.getElementById('x-foryou').checked,
      hideWhatsHappening: document.getElementById('x-whatshappening').checked,
      hideTodaysNews: document.getElementById('x-todaysnews').checked
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
    // YouTube
    document.getElementById('youtube-home').checked = data.settings.youtube.hideHome;
    document.getElementById('youtube-shorts').checked = data.settings.youtube.hideShorts;
    // X
    document.getElementById('x-foryou').checked = data.settings.x?.hideForYou ?? true;
    document.getElementById('x-whatshappening').checked = data.settings.x?.hideWhatsHappening ?? true;
    document.getElementById('x-todaysnews').checked = data.settings.x?.hideTodaysNews ?? true;
  });
}

document.addEventListener('DOMContentLoaded', loadSettings);

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', saveSettings);
});
