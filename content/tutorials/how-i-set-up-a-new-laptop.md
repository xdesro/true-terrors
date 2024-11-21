---
title: How I Set Up A New Laptop
abstract: Comes a time in any young man’s life where he must, inevitably, set up a new Mac computer for web development and other every-day purposes. Here’s how I do it!
publishDate: 2024-03-23T14:00-06:00
socialSharingImage: ./img/9gk.how-i-set-up-a-new-laptop.png
tags:
  - article
category: resource
topics:
  - bash
  - configuration
  - powerusers
toc:
  - { title: TL;DR, url: "#tl-dr" }
  - { title: Preheat the oven with Homebrew, url: "#preheat-the-oven-with-homebrew" }
  - { title: Dotfiles Mise en Place, url: "#dotfiles-mise-en-place" }
  - { title: Setting Up Git And Dotfiles, url: "#setting-up-git-and-dotfiles" }
  - { title: Installing apps with Brewfiles, url: "#installing-apps-with-brewfiles" }
  - { title: Installing apps without Brewfiles, url: "#installing-apps-without-brewfiles" }
  - { title: Last steps, url: "#last-steps" }
---

Well it's that time again, migrating for one reason or another listlessly between computers as priorities and jobs change. Here's a middle-depth breakdown of how I speed-run getting a new machine off the ground.

This post is for Mac computer users who might be interested in automating their setup workflow.{.target-audience}

## TL;DR

It's like 85% Homebrew automation and about 5% dotfiles and about 3% curling tools that aren't on Homebrew and 1% making sure Mac settings are correct. What you do with that remaining 6% is up to you, I’ve granted it to you as a gift — do not forget this kindness.

## Preheat the oven with Homebrew

Right off the bat I'll kick open a Terminal window and install Homebrew, which is a package manager for OSX. This tool will handle almost all of my installs going forward — I'm personally quite allergic to the dance of downloading, installing, and subsequently deleting ten thousand `.pkg` files from all corners of the 'Net, and besides, this is ✨ automated ✨.

The install steps that Homebrew asks for change over time, so your best bet is to [visit the Homebrew website and follow their directions](https://brew.sh/), but at the time of writing, the standard way of installing is a shell command:

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It's generally poor form to go pasting things from random strangers on the Internet into your Terminal. You can trust _me_ though, I'm like a _chill_ internet stranger.{.editors-note}

## Dotfiles Mise en Place

You've probably encountered dotfiles before, the janky extensionless files at your home directory that you sometimes have to edit to get certain shell commands to work, etc. Because they have so much potential for configuration, it’s super useful to store them online and reuse them, and that’ll power much of our setup. [Plenty of folks](https://dotfiles.github.io/tutorials/) have written at length about this pattern, so I won’t dive too deep here. Basically, we're gonna create a GitHub repo at our home directory, `.gitignore` everything (because we don't want to just be adding everything all wilson-nilson), and force-add only the relevant files. That repo will then be a quickly-downloaded source of truth for our hard-fought finicky IDE/terminal/prompt config.

I've currently got three configuration files in my dotfiles repo: a `.hyper.js` JSON config for Hyper terminal, a `.zshrc` for making my zsh + oh-my-zsh + [spaceship](https://spaceship-prompt.sh/) setup work well, and a Brewfile.

## Setting Up Git And Dotfiles

If I've got my dotfiles ready on an old laptop, I'll need to clone them onto a new machine. The first step for that is making I can even access the repo to clone it. I use GitHub to store my git projects, so I can follow their directions for:

- [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent), and
- [Adding that new SSH key to my GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

(Obviously you could just copy and paste from the browser but I use GitHub daily anyhow, may as well do this step now and never worry about it again!)

Once that's sorted, I can put dotfiles where they belong. Since the home directory already has stuff in it, it won't be possible to just `git clone`, so what we can do instead is:

```shell
cd ~
git init
git remote add origin DOTFILES_REPO_URL
git reset origin/main # we have to do this in case any of the files in dotfiles already exist
git checkout origin main
```

Now our Brewfiles/`.zshrc`/etc should have made it to where they belong! Next we can install all the apps that will adopt these configurations.

## Installing apps with Brewfiles

One of the cooler features of Homebrew is its ability to consume package files called Brewfiles _(similar to Gemfiles, if you're into the Ruby ecosystem at all)_, which can perform any number of sequenced actions. I've got most of my day-to-day apps and CLI tools sorted in the Brewfile I just pulled in the last step, and I can install them all at once. I've included a snippet of that Brewfile here, and you can [view the whole thing over here](https://github.com/xdesro/dotfiles/blob/main/Brewfile).

```rb
# Mac Apps with `--cask`
cask "alfred"
cask "firefox"

# CLI tools with `brew install`
brew "node"

# Even font files are fair game
tap "homebrew/cask-fonts" # point Homebrew to where the font file lives
cask "font-inconsolata-nerd-font" # install it
```

Once I've got my shopping list of apps set up, I can install all of them at once with a quick Homebrew command:

```shell
brew bundle install
```

Homebrew automatically looks to install from `~/Brewfile` if no other location is specified, so that Dotfiles import works seamlessly. Homebrew also has really straightforward logging — it’ll clearly indicate what it's doing, and which of its actions were successful or not.

## Installing apps without Brewfiles

I use two tools that don't jive well with Homebrew installation: `nvm` and `oh-my-zsh`.

NVM is a version manager for Node, and they explicitly say [on the repo install guide](https://github.com/nvm-sh/nvm/blob/811c039e2b6fb305e6eb2269d7aa0d21eb067586/README.md?plain=1#L225) that Homebrew install isn't supported. Theirs is—at the time of writing—just a `curl` command to run their install script:

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Remember what I said about running random commands you find online? Doesn't it seem like Apple should've made a secure, native package manager so installing stuff doesn't feel so back alley?{.editors-note}

Oh My Zsh is a config manager for zsh — it enables plugins like the _extremely_ useful [`git` shortcuts and aliases](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git) plugin. It's also a `curl` command:

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

And that ought to do it for installs for my default setup.

## Last Steps

Believe it or not, that should be everything sorted. Homebrew does _so_ much of the heavy lifting, usually all that remains is to do some logins (easily done if one uses [a password manager](https://1password.com/) 👀) and configure final Mac settings. I personally set auto-keyboard intervention to off as a default (I can’t with the auto-capitalization and spellcheck), as well as turn on the battery percentage in the top bar.

Thanks for reading! Hope it was useful, and I hope you find some meaningful, fitting way to get revenge on me for the time wasted if not. If you're following this like it's a tutorial and run into any issues, please [definitely let me know](mailto:yo@henry.codes?subject=You%20dog%2C%20you%20rat%20bastard.%20Your%20tutorial%20has%20holes%20like%20the%20Titanic.)!
