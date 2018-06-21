
console.log('hello world');
exit();
function fetchAnswer () {
  var weight = document.querySelector('#weight').value;
  var type = document.querySelector('#type').value;
  

  fetch(`results?weight=${weight}&type=${type}`)
    .then( (res) => {
      return res.json()
    })
    .then( json => {
      console.log(json);
      let output = document.querySelector('#output');
      output.innerText = json.answer;
    })
}