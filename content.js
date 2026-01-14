const DEFAULT_SETTINGS = {
  youtube: {
    hideHome: true,
    hideShorts: true
  }
};

let settings = DEFAULT_SETTINGS;

function shouldRemove(text) {
  if (text === 'home' && settings.youtube.hideHome) return true;
  if (text === 'shorts' && settings.youtube.hideShorts) return true;
  return false;
}

function removeYouTubeSidebarItems() {
  // Full sidebar items (expanded guide)
  const guideItems = document.querySelectorAll('ytd-guide-entry-renderer');
  guideItems.forEach(item => {
    const title = item.querySelector('yt-formatted-string.title');
    if (title) {
      const text = title.textContent.trim().toLowerCase();
      if (shouldRemove(text)) {
        item.remove();
      }
    }
  });

  // Mini sidebar items (collapsed guide)
  const miniGuideItems = document.querySelectorAll('ytd-mini-guide-entry-renderer');
  miniGuideItems.forEach(item => {
    const title = item.querySelector('span.title');
    if (title) {
      const text = title.textContent.trim().toLowerCase();
      if (shouldRemove(text)) {
        item.remove();
      }
    }
  });
}

function init() {
  // Load settings then start removing items
  chrome.storage.sync.get({ settings: DEFAULT_SETTINGS }, (data) => {
    settings = data.settings;

    // Initial removal with delay to wait for YouTube's dynamic content
    setTimeout(removeYouTubeSidebarItems, 1000);
    setTimeout(removeYouTubeSidebarItems, 2000);
    setTimeout(removeYouTubeSidebarItems, 3000);

    // Also observe for dynamic changes (YouTube is a SPA)
    const observer = new MutationObserver(() => {
      removeYouTubeSidebarItems();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });

  // Listen for settings changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.settings) {
      settings = changes.settings.newValue;
    }
  });
}

init();
