## How to run

In the project directory, you can run:
1. install node modules
`npm install`
2. Setup api url,
change config.example.js to config.js
adjust this line
`export const api = {
  host: 'localhost',
  port: '3015',
}`
3. run development
`npm run start`

## Features
- products are displayed in a grid.
- give the user an option to sort the products in ascending order. Can sort by "size", "price" or "id". The products list should be reloaded when a new sorting option is chosen.
- each product has :
- a "size" field, which is the font-size (in pixels). We should display the faces in their correct size, to give customers a realistic impression of what they're buying.
- a "price" field, in cents. This should be formatted as dollars like `$3.51`.
- a "date" field, which is the date the product was added to the catalog. Dates should be displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed.
- the product grid should automatically load more items as you scroll down.
- display an animated "loading..." message while the user waits for the data to load.
