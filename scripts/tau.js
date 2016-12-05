/*
http://devjana.net/support/tau_students.json

You first task is to make an AJAX call from the client side app.js, using an
.ajax method and access the json data through the url above. When successful, i
t should bring the data back down for use. You will then need to combine that
with what you have learned about parsing objects and arrays to complete the
challenge.
Todos
* call Ajax item[*]
* push the info recieved to an array[*]

JSON/Ajax reference: https://github.com/devjanaprime/tauAjaxJsonInClass

What I would like to see on the DOM, is one person at a time represented -
the info for the first person in the json data. One the screen should also be
Prev and Next buttons, that when pressed, show the information for the
appropriate person. These should wrap - prev when on the first person should
wrap around to show the last person and vice versa.
Todos-
* make prev and next buttons [*]
* make them show for the appropriate person[*]

Also on the DOM should be a display showing the number of people and which is
being currently viewed (eg. 2/20) [*]

When a person is displayed, show their name (first & last) and their info. Only
one person should be shown at any given time.[*]

KINDA HARD MODE
Add a button for each person - appended to DOM when the json is read in.
Clicking any button will display that person. Place these between the prev and
next buttons.
Ex: [Prev] [Larry] [Moe] [Curly] [Next]

HARD MODE
Include a fade out and fade in animation in-between transitioning people.

PRO MODE
Include a timer that moves to the next person if the user is not clicking on
next or prev. If the user clicks on next or prev, the timer should be reset.
The timer should transition between people every 10 seconds.
*/

var classmatesArray = [];

$(document).ready(function(){
// pulling in the JSON file and adding it to an array
  var classmates = function(){
    $.ajax({
      url: 'http://devjana.net/support/tau_students.json',
      dataType: 'JSON',
        success: function( data ){
        console.log( 'success, received:', data.tau  );
        for (var i = 0; i < data.tau.length; i++) {
         classmatesArray.push( data.tau[i] );
         displayClassmates(classmatesArray);
         studentButtons();
       }// end for loop
      } // end success
    }); // end ajax
  }; // end classmates
  classmates();

var i = 0;
var outputText = '';

var displayClassmates = function(student, index) {
       outputText = '<p>' + '<strong>' + "Name:" + '</strong>' + ' ' + classmatesArray[i].first_name + ' ' + classmatesArray[i].last_name + '</p>' +
       '<img class="portrait" src="' + classmatesArray[i].picUrl + '" />' + '<p>' + '<strong>' + "About" + ' ' + classmatesArray[i].first_name + ":" + '' +
        '</strong>' + ' ' + classmatesArray[i].info + '</p>' + '<p>' + 'Displaying Student:' + ' ' + (classmatesArray.indexOf(classmatesArray[i]) + 1) + ' ' + 'out of' + ' ' + classmatesArray.length;
       $('#classmates').html(outputText);
   }; //end displayStudents function

   $('#nextButton').on('click', function() {
    i = i + 1;
    i = i % classmatesArray.length; // if we've gone too high, start from `0` again
    //display to the dom
    outputText = '<p>' + '<strong>' + "Name:" + '</strong>' + ' ' + classmatesArray[i].first_name + ' ' + classmatesArray[i].last_name + '</p>' +
    '<img class="portrait" src="' + classmatesArray[i].picUrl + '" />' + '<p>' + '<strong>' + "About" + ' ' + classmatesArray[i].first_name + ":" + '' +
     '</strong>' + ' ' + classmatesArray[i].info + '</p>' + '<p>' + 'Displaying Student:' + ' ' + (classmatesArray.indexOf(classmatesArray[i]) + 1) + ' ' + 'out of' + ' ' + classmatesArray.length;
    $('#classmates').html(outputText);
    console.log(classmatesArray[i]);
}); //end next button on click function

//previous button function
$('#prevButton').on('click', function() {
    if (i === 0) { // i would become 0
        i = classmatesArray.length;
    }
    i = i - 1; // decrease by one
    //show student name and info on DOM
    outputText = '<p>' + '<strong>' + "Name:" + '</strong>' + ' ' + classmatesArray[i].first_name + ' ' + classmatesArray[i].last_name + '</p>' +
    '<img class="portrait" src="' + classmatesArray[i].picUrl + '" />' + '<p>' + '<strong>' + "About" + ' ' + classmatesArray[i].first_name + ":" + '' +
     '</strong>' + ' ' + classmatesArray[i].info + '</p>' + '<p>' + 'Displaying Student:' + ' ' + (classmatesArray.indexOf(classmatesArray[i]) + 1) + ' ' + 'out of' + ' ' + classmatesArray.length;
    $('#classmates').html(outputText);
    console.log(classmatesArray[i]);
}); //end prev button function

// working on trying to get button for each individual.
var button = "";
var studentButtons = function() {
  for (var i = 0; i < classmatesArray.length; i++) {
    button = '<button>'  + classmatesArray[i].first_name + '</button>';
    console.log(button);
    $('#classmateButtons').html(button);
  }// end for loop
};//end studentButtons


});// end document ready
