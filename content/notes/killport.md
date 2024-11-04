---
title: Find and kill processes at a given port
topics:
  - code snippet
  - shell scripting
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
