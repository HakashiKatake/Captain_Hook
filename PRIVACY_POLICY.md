# Privacy Policy for Captain Hook

**Last Updated:** January 1, 2026

## Introduction

This Privacy Policy explains how Captain Hook ("the Bot", "we", "us", or "our") collects, uses, and protects information when you use our Discord bot. By using Captain Hook, you agree to the collection and use of information in accordance with this policy.

## Information We Collect

### Data Collected Automatically

When you interact with Captain Hook, we may collect:

- **User IDs**: Discord user identifiers to provide features like AFK status, economy system, and reminders
- **Server IDs**: Discord server identifiers to store server-specific settings like custom prefixes
- **Channel IDs**: To enable features like message sniping and welcome messages
- **Message Content**: Only when you invoke a command or trigger a bot feature (e.g., blacklisted word detection)

### Data Stored Locally

Captain Hook stores the following data in a local SQLite database:

| Data Type | Purpose | Retention |
|-----------|---------|-----------|
| Server Prefix | Custom command prefix per server | Until server removes bot |
| AFK Status | User's AFK message | Until user returns |
| Sniped Messages | Last deleted message per channel | Temporary (session only) |
| Economy Data | Virtual currency balances | Persistent |
| Blacklisted Words | Server moderation | Until removed by admin |

## How We Use Your Information

We use collected information to:

- Execute bot commands you request
- Store your preferences (custom prefixes, AFK messages)
- Provide moderation features (word filtering)
- Maintain the virtual economy system
- Display server and user statistics

## Data We Do NOT Collect

- We do **NOT** collect or store message history
- We do **NOT** track your activity or presence persistently
- We do **NOT** collect personal information (email, IP address, etc.)
- We do **NOT** sell or share your data with third parties
- We do **NOT** use your data for advertising
- We do **NOT** use your data to train AI or machine learning models

## Third-Party Services

Captain Hook may interact with these external APIs:

- **Jikan API** (anime information) - No user data shared
- **waifu.pics** (anime GIFs) - No user data shared
- **Random animal APIs** (cat, dog, fox images) - No user data shared
- **ip-api.com** (IP lookup command) - Only IP addresses you provide

## Data Security

We implement reasonable security measures to protect your data:

- Data is stored locally on secured servers
- No sensitive personal information is collected
- Database access is limited to bot operations only

## Data Deletion

You can request data deletion by:

1. **AFK Data**: Use the `$afk` command to clear your status
2. **Economy Data**: Contact the bot owner
3. **Server Data**: Remove the bot from your server (all server-specific data will be deleted)

For complete data deletion requests, contact us via our [Support Server](https://discord.gg/MyneuXgVRr).

## Children's Privacy

Captain Hook is not directed at individuals under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided personal information, please contact us.

## Changes to This Policy

We may update this Privacy Policy from time to time. We will notify users of significant changes through our support server or bot announcements.

## Your Rights

You have the right to:

- Know what data we collect about you
- Request deletion of your data
- Opt-out of data collection by not using the bot
- Contact us with privacy concerns

## Contact Us

If you have questions about this Privacy Policy, please contact us:

- **Discord Support Server**: [https://discord.gg/MyneuXgVRr](https://discord.gg/MyneuXgVRr)
- **Bot Owner**: Hakashi Katake

---

*By using Captain Hook, you acknowledge that you have read and understood this Privacy Policy.*
