---
title: Set the default language for a file extension in VS Code
topics:
  - code snippet
  - json
  - vscode
atUri: 'at://did:plc:pbr2nzfsr6bcqjeqlvohmh5y/site.standard.document/3mn3zcaszok2y'
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
