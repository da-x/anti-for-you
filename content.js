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

let settings = DEFAULT_SETTINGS;

// Detect which site we're on
const isYouTube = window.location.hostname.includes('youtube.com');
const isX = window.location.hostname.includes('x.com') || window.location.hostname.includes('twitter.com');

// YouTube functions
function shouldRemoveYouTube(text) {
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
      if (shouldRemoveYouTube(text)) {
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
      if (shouldRemoveYouTube(text)) {
        item.remove();
      }
    }
  });
}

// X/Twitter functions
function removeXItems() {
  // Remove "For you" tab in timeline
  if (settings.x.hideForYou) {
    const tabs = document.querySelectorAll('[role="tab"]');
    tabs.forEach(tab => {
      const text = tab.textContent.trim().toLowerCase();
      if (text === 'for you') {
        tab.remove();
      }
    });

    // Also check for nav links with "For you"
    const navLinks = document.querySelectorAll('a[href="/home"], a[href="/foryou"]');
    navLinks.forEach(link => {
      const text = link.textContent.trim().toLowerCase();
      if (text === 'for you') {
        link.closest('[role="presentation"]')?.remove() || link.remove();
      }
    });
  }

  // Remove "What's happening" / Trending section in sidebar
  if (settings.x.hideWhatsHappening) {
    const trendingSection = document.querySelector('[aria-label="Trending"]');
    if (trendingSection) {
      trendingSection.remove();
    }

    // Also look for the section by heading text
    document.querySelectorAll('span').forEach(span => {
      const text = span.textContent.trim();
      if (text === "What's happening") {
        // Find the parent section container and remove it
        const section = span.closest('[data-testid="sidebarColumn"] > div > div > div');
        if (section) {
          section.remove();
        }
      }
    });
  }

  // Remove "Today's News" section specifically
  if (settings.x.hideTodaysNews) {
    document.querySelectorAll('span').forEach(span => {
      const text = span.textContent.trim();
      if (text === "Today's News") {
        // Find the parent trend item or section and remove it
        const trendItem = span.closest('[data-testid="trend"]');
        if (trendItem) {
          trendItem.remove();
        } else {
          // Try to find parent container
          const container = span.closest('[data-testid="sidebarColumn"] div[class*="r-1adg3ll"]');
          if (container) {
            container.remove();
          }
        }
      }
    });
  }
}

function init() {
  // Load settings then start removing items
  chrome.storage.sync.get({ settings: DEFAULT_SETTINGS }, (data) => {
    settings = data.settings;

    const removeItems = isYouTube ? removeYouTubeSidebarItems : isX ? removeXItems : () => {};

    // Initial removal with delay to wait for dynamic content
    setTimeout(removeItems, 1000);
    setTimeout(removeItems, 2000);
    setTimeout(removeItems, 3000);

    // Also observe for dynamic changes (both sites are SPAs)
    const observer = new MutationObserver(() => {
      removeItems();
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
