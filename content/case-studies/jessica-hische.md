---
title: Jessica Hische
clientName: Jessica Hische
clientType: Illustrator
heroImage: ./img/6Fg.Thumb_ Jessica Hische.jpg
thumbnailImage: ./img/6Fg.Thumb_ Jessica Hische.jpg
involvement: [design, development]
date: 2020-09-01T00:00-05:00
publishDate: 2020-09-01T00:00-05:00
duration: Summer 2020
abstract: Like a lot of small businesses,  New York Times best-selling author and world-class illustrator Jessica Hische relied on an off-the-shelf ecommerce platform. It was cost-effective and fulfilled her basic needs but she knew there was room for improvement in the experience for her customers, and she tasked me and the team at Faculty with this improvement.
briefAbstract: Reworking an off-the-shelf ecommerce platform to be as unique and expressive as its iconic shopkeeper.
link: https://www.jessicahische.shop/
---

In the summer of 2020, I had the great opportunity to redesign and code [jessicahische.shop](https://www.jessicahische.shop), the eCommerce platform through which _New York Times_ best-selling letterer and type designer Jessica Hische sells her prints, letterhead, pins, and more. I worked closely with Jessica and my esteemed team at Faculty to realize a more polished, more animated, and more well-featured vision of the site.

<blockquote>
  <p>Faculty is highly knowledgeable and professional, in both web design and development, as well as in niche fields like type design. They're kind people who are a joy to work with.</p>
  
  <cite>Jessica Hische</cite>
</blockquote>

## Impetus

When Jessica approached us with her existing site, it was a heavily-customized BigCartel template which lacked some key functionality that she prefered to see, such as custom product highlights for her font products, or a way to call attention to new product collections. The design of the site bore clear signs of the wit and whimsy of her personal style, but those signs were mired by a sense of clunkiness and incompleteness. The site felt off-the-shelf, which certainly wouldn't do for Jessica Hische.

## Design

In the design of the new site, I wanted to bring the eminent sense of delight that Jessica's lettering work has into every moment the user spent with us. Jessica is an incredible designer with years more experience than me, so it would be a mistake not to leverage her color and type choices as much as possible.

That left me layout, interaction, and animation as opportunities to take the project to the next level. After mirroring and adapting her personal design style into what a cleanly systemized and understandable eCommerce user interface layout, I carefully considered how each section might react and respond to a potential customer exploring the site. I was deliberate in rewarding every user action with a moment of meaningful animation to keep playfulness present in what might otherwise be a transactional browsing experience.

Magic moments would begin in the homepage, where one is greeted with a joyful flatlay animation that reveals Jessica's latest "Tomorrow, I'll Be" collection. I then adorned a wall with poster product images, as one might display the posters in their own home. To showcase Jessica's font offerings, I collected tidy rows where the user could plainly see the personality each font might have to offer at a glance.

On product pages, I animated a sleek, modern slider for product images. If the user changed a product option, such as from a natural maple frame to a gallery black frame, the slider would dynamically update. I further animated product radio buttons, and if a product option changed the price, the price would animate to the new total to make that price change more clear.

For fonts, I also designed an opportunity for users to play with the fonts, to see how their content or a specific glyph might look in context. [I've done this work extensively before](), and I've found it's a really lovely bit of interaction, makes the fonts feel much more real, and can even highlight some of their OpenType features by joyful accident.

## Code

As with [most of the projects I've work on at Faculty](https://faculty.com/standards/best-practices), progressive enhancement is a baseline requirement. BigCartel has some very specific requirements about how things are implemented, and I did my utmost to make sure the site was completely progressively-enhanced outside of those specific constraints.

I prefer to write animation code in CSS when possible, and that was the perfect fit for a project like this. Statefully swapping out classes as needed with Javascript and then hooking into those state changes with CSS timelines is a really performant and consistent workflow.

I did use a minimal Sass configuration for this project to keep variables and @media queries organized. BigCartel requires all styles be pasted into a "Custom HTML/CSS"-type UI (_how I have missed you, Tumblr dot com_), so there was some manual work involved in updating, and no real room for continuous integration, but you gotta play ball with the hand you're dealt, or something.

I always code from the smallest screen first, and use `@media (min-width: x)` queries to break to more involved layouts as space allows. I've seen one thousand different approaches to responsive code, and this one yields the fewest side effects and the most clear model of what changes in components, and when. This is personal preference, but I also tend to co-locate `@media` queries in Sass blocks, so it's very evident from a developer perspective how a component will act.

Almost all\* Javascript for this project is vanilla and bespoke, and written in as modular a way as possible, so as to load the smallest amount of JS per page.

(I did use a GSAP dependency to animate the prices on product pages, and BigCartel theme code requires jQuery be included for some built-in interactions, such as Apple Pay.) {.editors-note}

Writing a fully custom theme for BigCartel also involves writing Javascript to update the cart with products and quantities, but it's fairly straightforward DOM manipulation and calling BigCartel's JS libraries, so nothing too challenging.

## Conclusion

To say I was starstruck to work with Jessica is an understatement, and I'm very proud of the work we did both in terms of design and implementation to modernize her store, and imbue it with the same soul of joy and wonder that her lettering and illustration works hold.
