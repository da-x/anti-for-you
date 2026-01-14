<img src="logo-initial.svg" />

# Anti For You

A Chrome extension that removes algorithmically-driven "For You" sections and distracting navigation elements from popular websites.

## Why This Extension Exists

Social media platforms are designed as dopamine hijackers. They use sophisticated algorithms to keep users scrolling endlessly through content specifically curated to trigger dopamine releases, creating addictive behaviors that can negatively impact mental health, productivity, and overall wellbeing.

### The Problem
- **Algorithmic feeds** are designed to maximize engagement, not user wellbeing
- **"For You" sections** create infinite scroll patterns that exploit psychological vulnerabilities
- **Recommendation engines** prioritize sensational, divisive, or addictive content over meaningful material
- **Dopamine loops** created by these platforms can lead to decreased attention spans and increased anxiety

### The Solution
This extension helps users reclaim control over their digital consumption by removing the most problematic elements that fuel compulsive browsing behaviors. By eliminating algorithmic feeds and distracting navigation elements, users can engage with social media more intentionally and mindfully.

## Features

### YouTube
- **Hide Home button** - Removes the "Home" button from the sidebar to avoid the algorithmic homepage feed
- **Hide Shorts button** - Removes the "Shorts" button from the sidebar to avoid short-form video recommendations

### X (Twitter)
- **Hide "For you" tab** - Removes the algorithmic "For you" timeline tab
- **Hide "What's happening" section** - Removes the trending topics sidebar section
- **Hide "Today's News" section** - Removes the news highlights from the sidebar

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
| X (Twitter) | "For you" tab, "What's happening" section, "Today's News" section |

## How It Works

The extension uses content scripts that run on supported websites. It:

1. Waits for the page to load (with delays to handle dynamic content)
2. Finds and removes the configured navigation elements
3. Uses a MutationObserver to handle dynamically loaded content (for SPAs like YouTube and X)

## Privacy

This extension:
- Does not collect any user data
- Does not make any network requests
- Only uses Chrome's storage API to save your preferences locally
- Settings sync across your Chrome browsers if you're signed in

## License

MIT
