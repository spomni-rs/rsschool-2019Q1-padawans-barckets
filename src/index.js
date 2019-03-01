module.exports = checkBrackets;

function checkBrackets(str, config) {
  let stack = [];

  let brackets = (() => {
    let brackets = {};

    config.forEach(function(pair){
      let [opening, closing] = pair;

      if (opening === closing){
        brackets[opening] = function(){
          let lastSymbol = stack[stack.length - 1];

          if (lastSymbol === opening){
            stack.pop();
          } else {
            stack.push(opening);
          }

          return true;
        }
      }

      if (opening !== closing){

        brackets[opening] = function(){
          stack.push(opening);
          return true;
        }

        brackets[closing] = function(){
          let lastSymbol = stack[stack.length - 1];

          if (lastSymbol === opening){
            stack.pop();
            return true;
          } else {
            return false;
          }
        }
      }
    });

    return brackets;
  })();



  for (var i=0; i<str.length; i++){
    let symbol = str[i];

    if (brackets[symbol]){
      isCorrect = brackets[symbol]();
      if (!isCorrect){
        return false;
      }
    }
  }

  if (stack.length > 0 ){
    return false;
  } else {
    return true;
  }
}