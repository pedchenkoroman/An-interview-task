# The interview task

## Task
There is an array of numbers and a checkbox. You need to implement the logic when the checkbox is checked then it will show only even numbers and the checkbox is unchecked only odds.

## Solution
First and foremost I use the Reactive form to create the form control and handle the checkbox's changes. Also, I use the `partition` function for splitting the source Observable into two, one of them is `odd$` and another one is `even$`. Then I create two new Observables that just filter the array of numbers and then merge these two observables into one. Last but not least I use the share operator to create and convert a new one from cold to hot and use pipe `async` to show the result into the template.
