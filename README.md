# Anti For You

A Chrome extension that removes algorithmically-driven "For You" sections and distracting navigation elements from popular websites.

## Features

### YouTube
- **Hide Home button** - Removes the "Home" button from the sidebar to avoid the algorithmic homepage feed
- **Hide Shorts button** - Removes the "Shorts" button from the sidebar to avoid short-form video recommendations

All options are configurable through the extension settings.

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top right corner)
4. Click **Load unpacked**
5. Select the `anti-for-you` folder

## Usage

Once installed, the extension automatically hides the configured elements on supported websites.

### Configuring Options

1. Click the extension icon in Chrome's toolbar, or
2. Right-click the extension icon and select **Options**, or
3. Go to `chrome://extensions/`, find "Anti For You", and click **Details** → **Extension options**

Toggle the checkboxes to enable/disable hiding specific elements. Changes are saved automatically and apply immediately.

## Supported Sites

| Site | Elements Hidden |
|------|-----------------|
| YouTube | Home button, Shorts button |

More sites coming soon.

## How It Works

The extension uses content scripts that run on supported websites. It:

1. Waits for the page to load (with delays to handle dynamic content)
2. Finds and removes the configured navigation elements
3. Uses a MutationObserver to handle dynamically loaded content (for SPAs like YouTube)

## Privacy

This extension:
- Does not collect any user data
- Does not make any network requests
- Only uses Chrome's storage API to save your preferences locally
- Settings sync across your Chrome browsers if you're signed in

## License

MIT
