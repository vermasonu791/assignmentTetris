# Introduction
- I have created interface where you can play a mini game.which will show you how good you are on addition.
- Deploy link:- https://mini-game-1c7dc.web.app/

##  :beginner: Features
• The top left box shows the number to be achieved by addition.
• The top right box shows your current sum based on numbers you have selected from the
grid.
• The bar is your timer which when runs out, a new row appears from the top and slides down
to the available positions (like in tetris).

• The selected cells will appear in a different color than the other cells and if you select (click
on) a selected cell again, it must get de-selected and the sum in the top right box must show
the updated current sum after each selection / de-selection.

• A new row must appear at the top and should move down a row when the timer runs out or
sum is achieved; until each cell reaches at the bottom of the available space in its respective
column.

• In a similar manner, after you win a round and the selected numbers disappear, the remaining
cells must also move upwards and settle in the last empty block space in their respective
column.

###  Tools used to complete this
```
  1 React:- A JavaScript library for building user interfaces and to make single page application
  2 CSS Modules:- Using CSS modules avoid namespace collision for CSS classes
                  we can use the same CSS class in multiple CSS files
                  Using CSS Modules generates random CSS classes when displayed in the browser
                  
  3 Firebase:- Firebase is Google's mobile platform that helps you quickly develop high-quality apps           

```
###  :file_folder: File Structure
```
├── build
├── src
│   ├── assest
│.  │.    │── clock.png
│   ├── components 
│   │   ├── ClickCells
│   │   │   ├── ClickCells.js
│   │   │   ├── index.js
│   │   │   └── ClickCells.module.scss 
│   │   ├── Show
│   │   │   ├── Show.js
│   │   │   └── index.js
│   │   │    └── Show.module.scss 
│   │   ├──    Timer
│   │   │   ├── Timer.js
│   │   │   └── index.js
│   │   │    └── Timer.module.scss 
│   ├── containers 
│   │   ├── Home
│   │   │   ├── Home.js
│   │   │   ├── index.js
│.  │.  │   ├── Home.helper.js
│   │   │   └── Home.module.scss 
│   ├── Styles 
│   │   └── global.css
│   ├── Utils 
│   │   ├── constant.js
│   │   └── globalFunction.js
│   └──  index.js
├── package-lock.json
├── package.json
└── README.md
```

###  :nut_and_bolt: Run code on your system
- Clone the github repo to your system

```
$ use terminal 
$ go to the project directory /assignmetTetris
$ run command `npm i`
$ run command ` npm start`
$ Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
```


