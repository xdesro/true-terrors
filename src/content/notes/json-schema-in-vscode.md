---
title: "Hinting & autocompletion for JSON in VS Code"
topics:
  - code snippet
  - json
  - vscode
hasToc: true
---

Here’s a short and sweet guide to typing your JSON with JSON Schema and having VSCode validate and autocomplete based on that schema. Shoot me an email with questions or corrections!

## Create JSON Schema

There’s a standard for typing JSON called [JSON Schema](https://json-schema.org/), which you can use to model your data. For instance, I have a file `_data/recentReading.json` [in the repo for this project](https://github.com/xdesro/true-terrors/blob/main/src/_data/recentReading.json), and when I add new articles, I want VSCode to suggest the required fields, and warn me when I forget a field.

The JSON goes something like this:

```json
{
  "posts": [
    {
      "title": "A Brief History & Ethos of the Digital Garden",
      "author": "Maggie Appleton",
      "url": "https://maggieappleton.com/garden-history"
    },
    // ...
  ]
}
```

This is a pretty simple example, so it ought to be noted that JSON Schema of course does way more than this.

Following the guides on the JSON Schema site, I can create a file `recentReading.schema.json`, which I’ll keep in my `.vscode` directory for now, since VSCode is the only interested party.

```json
// .vscode/recentReading.schema.json
{
  "title": "Recent Reading",
  "description": "A list of recently read articles online.",
  "type": "object",
  "properties": {
    // The top-level object should take a property "posts",
    // which is an array of post objects.
    "posts": {
      "type": "array",
      "items": {
        "type": "object",
        // The post object should accept properties "title", "author",
        // and "url", and no additional properties:
        "properties": {
          "title": {
            "type": "string"
          },
          "author": {
            "type": "string"
          },
          "url": {
            "type": "string",
            "format": "uri"
          }
        },
        "additionalProperties": false,
        // "title", "author", and "url" must be present.
        "required": ["title", "author", "url"]
      }
    }
  },
  "required": ["posts"]
}
```

I reckon this is pretty self-explanatory, but I recommend checking out [the JSON Schema reference](https://json-schema.org/understanding-json-schema/reference) for more information.


## Make VSCode observe the schema

Supposedly, you can set the schema for a glob of URLs using `json.schemas: [{ fileMatch, url }]` in `.vscode/settings.json`, but I found this didn’t work properly. Instead, I set the `$schema` property directly in the `recentReading.json` file:

```json
// src/_data/recentReading.json
{
  "$schema": "../../.vscode/recentReading.schema.json", // or whatever the path to schema you created is, relative to the current JSON file.
  "posts": [ /* ... */ ]
}
```

This isn’t ideal, because it makes the files concerned with their own validation, and I prefer them only to be concerned with their content. If someone knows why the VSCode settings `json.schemas` configuration didn’t work, email me lol.{.editors-note}

Now in my JSON file, if I create an object under `"posts"` that contains anything but a title, author, and URL, it’ll throw an error in the VSCode Problems view:

<div class="subgrid two-col" style="--standard-column: 2 / span 10;">

![A VSCode screenshot showing the IDE throwing an error when an empty object is added to the "posts" entry of the described JSON, as the required properties "title", "author", and "url" are missing.](https://res.cloudinary.com/henry-codes/image/upload/v1736462618/CleanShot_2025-01-09_at_15.41.39_2x_icrwuq.png)

![A VSCode screenshot showing the IDE throwing an error when an object with the property "test" is added to the "posts" entry of the described JSON, as the "test" property isn’t allowed.](https://res.cloudinary.com/henry-codes/image/upload/v1736462617/CleanShot_2025-01-09_at_15.42.40_2x_itztpo.png)

</div>

## Autocompletion in VSCode

We can use a special VSCode schema property called "defaultSnippets" to show VSCode how to automatically scaffold our entries. In the schema file, where you define the properties for the item you want auto-completed, you can add the following:


```json
{
  //...
  "posts": {
    "type": "array",
    "items": {
      "type": "object",
      "defaultSnippets": [
        {
          "label": "New recent reading",
          "description": "Creates a post in recent reading list",
          "body": { "title": "$1", "author": "$2", "url": "$3" }
        }
      ],
      "properties": { /* ... */}
    }
  }
}
```

More on `defaultSnippets` formatting can be found [in the VSCode docs](https://code.visualstudio.com/Docs/languages/json#_define-snippets-in-json-schemas).

Now, in my `recentReading.json` file, under my `posts` entry, I can use the keyboard shortcut <kbd>Control (^)</kbd> + <kbd>Space</kbd> to show my available auto-completions:

![A VSCode editor window showing the described autocompletion, opening a suggestion to inset "new recent reading".](https://res.cloudinary.com/henry-codes/image/upload/v1736463740/CleanShot_2025-01-09_at_15.56.59_2x_xy9t8a.png)

Which will auto-expand into the shape I expect for an entry:

![A VSCode editor window showing the described object insertion, an object with the properties title, author, and url set to empty strings.](https://res.cloudinary.com/henry-codes/image/upload/v1736463761/CleanShot_2025-01-09_at_16.02.36_2x_mc9yln.png)

I’m not sure what the keyboard shortcut is on Windows or Linux, I would guess <kbd>Alt</kbd> + <kbd>Space</kbd>, but the action in VSCode is "Trigger Suggest" if you want to look it up in Keyboard Shortcuts.{.editors-note}