---
title: I made a Plex server
abstract: >-
  In the interest of local-first, ownership-first, and friend-first computing, I
  built a Plex server that sits in my closet. 
publishDate: 2026-07-14T18:26:16.254Z
heroImage: >-
  https://res.cloudinary.com/henry-codes/image/upload/v1784053507/IMG_20260606_081603887_iqmvv5.jpg
customThreshold: 150
useHero: true
tags:
  - article
category: resource
topics:
  - personal computing
  - plex
atUri: 'at://did:plc:pbr2nzfsr6bcqjeqlvohmh5y/site.standard.document/3mqmtunullc2i'
---

There's a lot to like about Plex from a philosophical standpoint — it's local-first software centered around sharing your favorite art with your friends. Plex hosts movies, TV, and music — media you purchase because you love it, and share with your friends because we share media we love with our friends since time immemorial. 

I've been shaking loose streaming services for the past three or four years, kicking the strident bells of subscription renewal emails back into the grass — I think ownership is important. If I love a book I can keep it on my shelf, but if I love a movie I have to pay $19.99/mo forever and hope that the higher-ups at [Poob Streaming Inc.](https://i.kym-cdn.com/photos/images/original/003/056/633/b8b.png) don't  decide to take it down. Plex is a natural answer to the tension between on-shelf ownership and on-line convenience: I purchase movies and I upload them to a server I own, and then I can conveniently share them with folks I love, and those folks can share with me in the same stroke.

Here's how I started hosting my own Plex server.

## Hardware
To run Plex the software, you need some hardware to run it on. Many folks will use a cloud service, but paying a new subscription to have someone else's computer in another data center hold my media is opposed to the goal of paying once to hold a thing I own. I did a bit of research and decided to pick up a network-attached storage (NAS) device from Synology. This would offer a middle-of-the-road affordable home for the server to run on. This solution isn't super cheap, but it's also not super expensive. 

A NAS is basically just a toaster for hard drives that you staple to your internet router: the DS225+ I chose lets you mount two hard drives of basically any size and connect that storage to the internet. It has a 2.5Gb ethernet port, which is far more bandwidth than my small group of friends would ever use, has a decent operating system, and doesn't use too much power. The downsides are chiefly that it *only* lets you mount two drives (there are variants that are expandable), and it has pretty limited actual CPU and memory capacity (you can expand it), but I was happy with those downsides for my first foray into local server hosting. 

I bought the Synology DS225+ and a Seagate 4TB HDD from Micro Center for $500 total — again, you could go more premium or less, depending on your needs and allergies to tinkering. 

## Server setup
The first step of building the server was to install the drive, which was as simple as mounting the hard drive in the NAS hard drive tray and slotting it back in. This process had an extremely satisfying mechanical reload effect to it and I'd recommend this NAS purely off the *kachunk* of it all. 

Second step was to connect the 2.5GbE port (there are two ethernet ports) to my router.

Thirdly, I followed the setup wizard on [find.synology.com](https://find.synology.com), which automatically detects Synology devices and lets you configure them for your <abbr title="redundant array of independent disks">RAID</abbr> preferences, setup the operating system behaviors and user accounts.

![A website screenshot showing the headline "Find your Synology device". There is a table of devices, one labeled plexiglass, which is presumably the author's device.](https://res.cloudinary.com/henry-codes/image/upload/v1784053837/CleanShot_2026-07-13_at_12.45.08_2x_pkkcpo.png)

After this configuration process was completed, I'm able to visit the operating system (Synology calls it DiskStation Manager/DSM) at the IP address I got back from the wizard.
### Folder structure
Next I created a shared folder to keep my Plex libraries (Movies, TV, etc) in. The way the app works is that there is a place where the files that run the server live, and a separate place where the files that are *on* the server live.

In the Synology OS, **Control Panel → Shared Folder → Create** gets me a new shared folder, which I called `media`. In there, I created additional folders for each library Plex should be concerned with:
```
. 
└── media/ 
	├── Movies/ 
	├── TV/ 
	└── Music/
```

Once I've got the Plex server installed on the NAS, I can point it at these directories, and keep my media files separate.

As a quick important reiteration: `Plex Media Server/` in the filesystem is *not* where media lives. One needs to upload media to the dedicated library folders created.
### Installing Plex
In the Synology OS, I went to the Package Center and installed Plex Media Server, which is conveniently a first-class package for Synology. 

Once launched, I viewed the server setup screen at port `:32400` on my NAS IP — the previous screenshot shows that the Plex URL would be `10.0.0.200:32400`. The Plex setup is fairly straightforward, creating libraries like *Movies* or *Music* and pointing them at the correct folders.

Also important to note, when configuring the Plex transcoding preferences, the DS225+ off the shelf does not have a ton of power for this kind of thing. I would recommend erring on the side of being kind to the CPU and scheduled transcoding tasks.

Once the server is up-and-running, you'll be able to access it as a user (instead of a server admin) by visiting `app.plex.tv/desktop`.

## Adding media
On my Mac laptop and my Windows workhorse PC, I added the NAS as a filesystem target so I could move files onto it.
### On Windows
It's called “[mapping a network drive](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/file-sharing-over-a-network-in-windows)” on Windows — **File Explorer → More ⋯ → Map network drive**, and then set the network address to the network of the NAS.
### On MacOS
On a Mac it's called "Connect to Server" in Finder: **Finder → Go → Connect to Server**, and then `smb:${WHATEVER_THE_NAS_IP_IS}`.

Then it was as simple as moving the media files I own off my personal computers and into the NAS filesystem. I've learned through trial and error and a lot of jank that names are very important and useful to the Plex ecosystem. They've got some strong guidance on their blog for naming and organizing:
- [Naming and organizing your Movie files](https://support.plex.tv/articles/naming-and-organizing-your-movie-media-files/)
- [Naming and organizing your TV show files](https://support.plex.tv/articles/naming-and-organizing-your-tv-show-files/)

## Granting access to the Plex library
Now for the *sharing with friends* aspect. In your server under the extra items menu, there's a *Grant Access...* option. You can add your friends by their Plex emails.

![A portion of the Plex dashboard user interface, showing the server name selected, then a dropdown menu with 'grant access...' as the top item.](https://res.cloudinary.com/henry-codes/image/upload/v1784053936/CleanShot_2026-07-14_at_11.56.59_2x_rzwlb8.png)

One thing to note here is that folks can setup their personal Plex dashboard however they want. Plex the app has some rentals and Live TV, and we found a bit of friction with some users who didn't realize you could pin our hosted server libraries.

## Granting access to the NAS
To let my friends upload their own files, I used Synology's *QuickConnect* service, which lets me configure a URL that folks can log in with. This is a *tiny* bit of a hassle but in a trusted network of friends it works great. 

I created a user account for visitors on the NAS itself (not on the Plex dashboard) via **Control Panel → User & Group**, and gave the user access to the shared `media/` folder. 

Then after configuring QuickConnect through **Control Panel → QuickConnect**, I had a URL (something like `https://quickconnect.to/true-terrors-nas`) which would allow my friends to visit, log in as the NAS user account, and upload files in the Synology **File Station**.

## Going further
Since setting up the server, I've made some changes.

### Expanding the RAM
The DS225+ has like 2GB of RAM off the rip, which is tremendously bad, and I found that the NAS was crashing the second I uploaded a full season of TV (from Plex trying to identify the intro and credits sections). The NAS has a single expansion slot, and I added [an 8GB card](https://www.newegg.com/crucial-8gb-ddr4-2666-cas-latency-cl19-notebook-memory/p/0RM-0006-00C66), which improved the responsiveness of everything immediately. 

Important to note that Synology has very strict rules about which RAM you can use, and using a non-approved RAM module will void your warranty. The linked module is not approved but has more memory capacity than the approved modules.{.editors-note}

### Adding transcoding drivers
The DS225+ actually does have an integrated graphics processing unit, *but* Synology removed hardware transcoding drivers for some reason. Someone added the necessary modules for adding those drivers back, and I would recommend installing those. You can [read more about improving that transcoding functionality on GitHub](https://github.com/007revad/Transcode_for_x25).

### Plex Pass
Plex actually does charge users to use features like skipping intros/credits, downloading media offline, and manage additional server settings. They do *unfortunately* offer this as a subscription, but they also offer it as a lifetime buy-once pass. When I bought the lifetime Plex Pass it was literally $500 cheaper than it apparently is now, which to me sounds absurd, and I'd be interested to hear if anyone's found a better route. 

### Additional pieces
You can host tools like [Seerr](https://seerr.dev/) and additionally the [Servarr](https://wiki.servarr.com/) stack on your NAS via Docker, to allow users to discover, request, and source additional media. This is tentative territory and if you go, go with caution and with care.

I also built a Discord bot that leverages Plex webhooks to notify folks in Discord when media they've requested via Seerr is available.

![A message from a Discord bot called Plexy, which reads "Hear ye, hear ye, @henry! A movie you requested has been added to the plexiglass server!", and has an embed for the Sam Neill movie Event Horizon.](https://res.cloudinary.com/henry-codes/image/upload/v1784053943/CleanShot_2026-07-14_at_12.19.28_2x_rrglda.png)

Anyway that's all for me for this one. As ever, if anything's unclear, or if I can answer any questions, feel free to reach out to me [via email](mailto:yo@henry.codes) or [on Bluesky](https://bsky.app/profile/strange.website). 
