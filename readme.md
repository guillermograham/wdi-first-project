### Installation and Setup

**Run locally**

* Download or clone the Github repo

**View online**

* View on Heroku
* View on GitHub

### Technologies used


During the creation of this project, I used the following technologies:

* HTML 5
* SCSS
* JavaScript (ECMAScript 6)
* jQuery
* Git
* GitHub
* Heroku

### Challenges faced

The first issue that I encountered was how to deal with the squares on the outer rows and columns on the grid. The inside squares toggle the 4 squares that they are in contact with (above, to the right, below, and to the left). However, the squares in the corner only toggle 2 other squares, whilst the other outer squares toggle 3 other squares.

A way around this issue was creating a layer of squares around the game grid, which the previously outer squares can toggle. However, due to CSS settings, this outer grid is not visible to the user.

Another issue was keeping my code DRY. I underestimated the complexity of implementing a second-player mode during the limited time available to complete the project.

The second-player mode involves 2 users taking turns to create and complete grids. In the time available, I was unable to completely devise code to be utilised by both users during the second-player mode. As such, there is lots of repeated code for both stages of the game.

### Where next?

* Avoiding the need for the outer layer of invisible squares:
	* Some code is required to mitigate the issue of squares which are not in contact with 4 other squares.

* Ensuring the code is DRY:
	* An object for each square, documenting the squares with which they are in contact, may not be necessary. It could be possible to calculate the square's neighbouring squares from its position within the grid.
	* Utilising the moveCounter variable more so that Player One and Player Two can use the same functions during the second-player mode.

* Implementing a scoring system in the one-player mode:
	* Ideally this would generate a score for each level, and the combined score of each level would be logged for each user, utilising local storage.

* Improving the UI:
	* Animations on the grid to run once a level has been completed on first-player mode.
	* Additional sound effects providing positive feedback once a level has been completed.