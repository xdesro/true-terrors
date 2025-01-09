---
title: "Set the default language for a file extension in VS Code"
topics:
  - code snippet
  - json
  - vscode
---

In `.vscode/settings.json`:

```json
{
  "files.associations": {
    // extension as blob: language
    "*.webc": "html"
  }
}
```
