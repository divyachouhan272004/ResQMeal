# ResQMeal — Week 5 SPA Simulation (Enhanced Existing Project)

This package preserves the existing ResQMeal layout, styles, food listing, claim modal, and surplus-food form. It adds Week 5 single-page navigation behavior rather than replacing the project with a different design.

## Files
- `index.html` — original page structure with an accessible SPA route-status announcement.
- `style.css` — original styling plus small SPA navigation/focus/reduced-motion enhancements.
- `script.js` — original interactions plus hash/history-based SPA section navigation.
- `Week5_Technical_Report.md` — architecture, changes, implementation notes, and test checklist.

## Run
Keep the files together and open `index.html` in a browser or use VS Code Live Server.

## Week 5 enhancements
- Internal section links are handled by JavaScript without a full page reload.
- URL hash and browser history are updated through the History API.
- Back/Forward navigation restores the relevant section.
- Current navigation item is updated with an active class and `aria-current`.
- A screen-reader status message announces section changes.
- Section arrival motion respects the reduced-motion preference.
- Existing listing search/filter, claim modal, and surplus-food listing form are retained.

## Important
This is a front-end prototype. Listings and claims are not connected to a server or database. Test the checklist in the report and only report results you actually observe.
