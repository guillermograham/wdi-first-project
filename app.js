$(() => {

  const powers = {

    9: { top: 2, right: 10, bottom: 16, left: 8 },
    10: { top: 3, right: 11, bottom: 17, left: 9 },
    11: { top: 4, right: 12, bottom: 18, left: 10 },
    12: { top: 5, right: 13, bottom: 19, left: 11 },
    13: { top: 6, right: 14, bottom: 20, left: 12 },

    16: { top: 9, right: 17, bottom: 23, left: 15 },
    17: { top: 10, right: 18, bottom: 24, left: 16 },
    18: { top: 11, right: 19, bottom: 25, left: 17 },
    19: { top: 12, right: 20, bottom: 26, left: 18 },
    20: { top: 13, right: 21, bottom: 27, left: 19 },

    23: { top: 16, right: 24, bottom: 30, left: 22 },
    24: { top: 17, right: 25, bottom: 31, left: 23 },
    25: { top: 18, right: 26, bottom: 32, left: 24 },
    26: { top: 19, right: 27, bottom: 33, left: 25 },
    27: { top: 20, right: 28, bottom: 34, left: 26 },

    30: { top: 23, right: 31, bottom: 37, left: 29 },
    31: { top: 24, right: 32, bottom: 38, left: 30 },
    32: { top: 25, right: 33, bottom: 39, left: 31 },
    33: { top: 26, right: 34, bottom: 40, left: 32 },
    34: { top: 27, right: 35, bottom: 41, left: 33 },

    37: { top: 30, right: 38, bottom: 44, left: 36 },
    38: { top: 31, right: 39, bottom: 45, left: 37 },
    39: { top: 32, right: 40, bottom: 46, left: 38 },
    40: { top: 33, right: 41, bottom: 47, left: 39 },
    41: { top: 34, right: 42, bottom: 48, left: 40 }

  };

  let currentLevel = null;
  let levelCount = null;
  const levels = [
    [23, 25, 27],
    [9, 11, 13, 16, 18, 20, 30, 32, 34, 37, 39, 41],
    [10, 12, 16, 17, 19, 20, 23, 24, 26, 27, 30, 31, 33, 34, 38, 40],
    [16, 17, 19, 20, 30, 34, 37, 38, 40, 41],
    [9, 10, 11, 12, 16, 17, 18, 20, 23, 24, 25, 27, 33, 34, 37, 38, 40, 41],
    [23, 25, 27, 30, 32, 34, 38, 39, 40]
  ];
  let numberMoves = 0;
  let totalMinutes = '00';
  let totalSeconds = '00';
  let clockTimer;

  const $squares = $('.inner');
  const $startButton = $('#startButton');
  const $resetButton = $('#resetButton');
  const $stopButton = $('.stopButton');
  const $movesCounter = $('.movesCounter');
  const $movesNumber = $('#moveCount');
  const $timer = $('.timer');
  let $minutes = $('#minutes');
  let $seconds = $('#seconds');


  // MULTIPLAYER VARIABLES
  let playerOneName = null;
  let playerTwoName = null;

  const $twoPlayerBtn = $('.multiplayerModeButton');
  const $playerOneForm = $('.playerOneName');
  const $playerOneSubmitBtn = $('#playerOneSubmit');
  const $playerTwoForm = $('.playerTwoName');
  const $playerTwoSubmitBtn = $('#playerTwoSubmit');





  function getSquareId (e){
    const squareId = $(e.target).attr('id');
    numberMoves++;
    getNeighbours(squareId);
    $movesNumber.html(numberMoves);
  }

  function getNeighbours (current){
    const top = powers[current]['top'];
    const right = powers[current]['right'];
    const bottom = powers[current]['bottom'];
    const left = powers[current]['left'];

    toggleClass(current, top, right, bottom, left);
  }

  function toggleClass (squareId, top, right, bottom, left){
    $(`#${squareId}`).toggleClass('on');
    $(`#${top}`).toggleClass('on');
    $(`#${right}`).toggleClass('on');
    $(`#${bottom}`).toggleClass('on');
    $(`#${left}`).toggleClass('on');
    checkNumber();
  }

  function startUp(){
    levelCount = 0;
    currentLevel = levels[0];
    numberMoves = 0;
    for (let i = 0; i < levels[0].length; i++){
      $(`#${levels[0][i]}`).toggleClass('on');
    }
    $movesCounter.attr('id', 'movesCounterActivated');
    $movesNumber.html(numberMoves);
    $timer.attr('id', 'timerActivated');
    $minutes.text(totalMinutes);
    $seconds.text(totalSeconds);
    totalMinutes = 0;
    totalSeconds = 0;
    $startButton.off('click', startUp);
    $stopButton.on('click', stop);
    startTimer();
    squaresClickable();
    resetButtonActivate();
  }

  function checkNumber(){
    const $numberLightsOn = $('.on.inner').length;
    if ($numberLightsOn === 0){
      console.log('You have won!');
      $squares.off('click', getSquareId);
      stopTimer();
      $('.nextLevelButton').attr('id', 'activate');
      $('.nextLevelButton').on('click', nextLevel);
    }
  }

  function squaresClickable(){
    return $squares.on('click', getSquareId);
  }

  function squaresUnclickable(){
    return $squares.off('click', getSquareId);
  }

  function resetButtonActivate(){
    return $resetButton.on('click', reset);
  }

  function deactivateResetButton(){
    return $resetButton.off('click', reset);
  }

  function reset(){
    $squares.off('click', getSquareId);
    const $lightsOn = $('.on');
    $lightsOn.removeClass('on');
    numberMoves = 0;
    totalMinutes = '00';
    totalSeconds = '00';
    stopTimer();
    if (levelCount === 0){
      startUp();
    } else {
      $minutes.text(totalMinutes);
      $seconds.text(totalSeconds);
      $movesNumber.html(numberMoves);
      newLevelSetup();
    }
  }

  function startTimer(){
    clockTimer = setInterval(setTime, 1000);
  }

  function stopTimer(){
    clearInterval(clockTimer);
  }

  function setTime(){
    totalSeconds++;
    $seconds.html(pad(totalSeconds%60));
    $minutes.html(pad(parseInt(totalSeconds/60)));
  }

  function pad(digit){
    if (typeof digit === 'number' && digit < 10){
      return `0${digit}`;
    } else {
      return digit;
    }
  }

  function nextLevel(){
    $('.nextLevelButton').off('click', nextLevel);
    levelCount++;
    numberMoves = 0;
    $movesNumber.html(numberMoves);
    totalMinutes = '00';
    totalSeconds = '00';
    $minutes.text(totalMinutes);
    $seconds.text(totalSeconds);
    totalMinutes = 0;
    totalSeconds = 0;
    console.log('pressed');
    $('.nextLevelButton').removeAttr('id');
    newLevelSetup();
  }

  function newLevelSetup(){
    console.log(levelCount);
    for (let i = 0; i < levels[levelCount].length; i++){
      $(`#${levels[levelCount][i]}`).toggleClass('on');
    }
    console.log('I have been reached!');
    startTimer();
    squaresClickable();
  }

  function stop(){
    numberMoves = 0;
    $movesNumber.html(numberMoves);
    stopTimer();
    deactivateResetButton();
    $squares.off('click', getSquareId);
    const $lightsOn = $('.on');
    $lightsOn.removeClass('on');
    totalMinutes = '00';
    totalSeconds = '00';
    $minutes.text(totalMinutes);
    $seconds.text(totalSeconds);
    clockTimer;
    levelCount = null;
    $startButton.on('click', startUp);
    $stopButton.off('click', stop);
  }


  $startButton.on('click', startUp);
  $twoPlayerBtn.on('click', getPlayerOneName);



  // MULTIPLAYER MODE

  function getPlayerOneName() {
    $playerOneForm.attr('id', 'playerOneNameActivated');
    $playerOneSubmitBtn.on('click', playerOneNameSubmit);
    console.log(playerOneName);



  }

  function getPlayerTwoName() {
    console.log('SHOWING player 2 form');
    $playerTwoForm.attr('id', 'playerTwoNameActivated');
    $playerTwoSubmitBtn.on('click', playerTwoNameSubmit);
    console.log(playerOneName);


  }

  function playerOneNameSubmit(e){
    e.preventDefault();
    playerOneName = $('#GET-name-playerOne').val();
    $playerOneForm.hide();
    getPlayerTwoName();
  }

  function playerTwoNameSubmit(e){
    e.preventDefault();
    playerTwoName = $('#GET-name-playerTwo').val();
    $playerTwoForm.hide();
    console.log(playerTwoName);
  }



});
