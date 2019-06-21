# MLB Game Browser

### Step 1 Initialize project

- Created index.html.
- Created /scripts, /styles.
- Setup Babel, webpack to use ES6 features.

### Step 2 Get Data

- Wrote fetch call to MLB API.
- Wrote `getTodayDate` fn to return today's date string in `YYYY-MM-DD` format. Feed this date string to fetch call
- Extracted function for processing fetch result, and filtering out objects that are missing relevant data. 
- Relevant data includes: headline, description, img src, and img altText.

### Step 3 Create a "Slide" HTML Template

- Create a hardcoded "Slide" HTML block, w/ CSS styles written using BEM convention. 

### Step 4 Write a Slide "component" class

- Constructor method defines Slide's container Node, and properties (from arguments). Calls `render()` method at the end. 
- Slide's `render()` method uses string template literals to insert properties into appropriate HTML elements. Sets Slide's container's innerHTML to the filled template.
- Slide's getter method `html()` gives Slide's container. For mounting.

### Step 5 renderSlides
- Once data is fetched, map over data to mount Slide components into the slide container. 
- Added a conditional to show "NO DATA" if data is empty.

### Step 6 Focus slide
- Wrote class `slide__item--focus` to enlarge and bring current slide into focus. 
- In `renderSlides`, first Slide in array is toggled focused by default.

### Step 7 Add Arrow Key Press functionality
- Wrote `onkeypress` callback to listen for 'right' and 'left' keypresses. Defocus current Slide, focus next Slide.
- Also wrote some logic (needs fixing) to shift slide container left or right in order to keep focused Slide in view.

- - -

### TASKS FOR THE FUTURE

- Smoother scrolling effect.
- Clip description after last full word, instead of on character count.
- If no data found for current date, fallback on previous date.
    - In case API has changed, we don't want to get caught in an infinite loop. repeat 3-5 times, and then default to "NO DATA".