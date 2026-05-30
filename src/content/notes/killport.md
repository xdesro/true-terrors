---
title: Find and kill processes at a given port
topics:
  - code snippet
  - shell scripting
date: 2021-10-13T06:00:00.000Z
atUri: 'at://did:plc:pbr2nzfsr6bcqjeqlvohmh5y/site.standard.document/3mn3zcb3o2c2y'
---

In your terminal or `.zshrc`, etc:

```bash
function killport {
    echo '🚨 Killing all processes at port' $1
    lsof -ti tcp:$1 | xargs kill
}
```

Usage

```sh
killport 8080

# 🚨 Killing all processes at port 8080
```
