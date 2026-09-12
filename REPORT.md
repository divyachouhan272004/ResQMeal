# ResQMeal — Week 1 Static Web Page Report

## Project Overview
ResQMeal is a static front-end prototype for a food surplus sharing platform. The concept connects restaurants, grocery stores, individuals, and shelters with people who can use surplus food before it becomes waste. This Week 1 implementation focuses only on the front-end presentation using semantic HTML5 and CSS3.

## Design Decisions
The visual design uses a natural green and warm cream palette to communicate sustainability, trust, and food. Orange accents are used for urgency and calls to action. The interface uses rounded cards, clear spacing, and strong typography to make the content easy to scan.

The homepage follows the hierarchy defined in the project wireframe: navigation, hero section, impact statistics, nearby surplus food, how it works, user groups, call-to-action, and footer. The two main actions are “Find Surplus Food” and “List Food”, because these represent the primary user journeys.

## HTML Structure
Semantic HTML elements such as `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` are used to reflect the page hierarchy. Food listings are represented as individual `<article>` elements. Navigation and buttons are implemented as accessible links and controls.

## CSS and Layout Strategy
CSS Grid is used for the main hero, food cards, statistics, audience cards, and footer. Flexbox is used for navigation, buttons, card metadata, and the step-by-step workflow. CSS custom properties are used for colors and common design values so the stylesheet is easier to maintain.

## Responsiveness
The page uses CSS media queries at multiple breakpoints. On tablets, the three-column food grid becomes two columns. On mobile screens, the navigation changes to a compact menu, the hero becomes a single-column layout, cards stack vertically, and the four-step workflow becomes a vertical sequence. Typography and spacing also scale down for smaller devices.

## Challenges and Solutions
One challenge was creating a visually rich hero section without relying on external image assets. This was solved with CSS shapes, cards, and emoji-based food illustrations, keeping the prototype lightweight. Another challenge was preserving readability on mobile devices. Grid and flex layouts were combined with media queries so content can reflow instead of using fixed widths.

The time-sensitive nature of the concept was also reflected in the listing cards through expiry labels such as “Expires in 2h” and availability indicators. This makes the interface communicate the most important information quickly.

## Conclusion
The ResQMeal static prototype converts the Week 1 wireframe concept into a responsive webpage using HTML5 and CSS3. It demonstrates semantic structure, organized styling, responsive layouts, clear visual hierarchy, and a practical user-focused design. The prototype can later be extended with JavaScript, APIs, authentication, location services, notifications, and a database without changing the overall information architecture.
