const sideMargin = 20;
const topMargin = 20;
let timeout = getTimeout();

function createSubArray(arr, from, to) {
  let $container = $("<div></div>").addClass("array-container");
  for(let i = from; i < to; i++) {
    let $value = $('<p></p>').text($(arr.childNodes[i]).text());
    let $element = $('<div></div>').addClass('array-element');
    $container.append($element.append($value));
  }

  return $container[0];
}

function animateDivision(half, dir) {
  return new Promise(resolve => {
    half.animate({
      transform: [
        `translate(${dir}10px, ${-$(half).height() - topMargin} px)`,
	'translate(0,0)'
      ]
    }, timeout.value);
    setTimeout(() => {
      resolve();
    }, timeout.value); 
  });
}

function animateMergeAlgorithmPlacement(element, target) {
  return new Promise( resolve => {
    element.animate({
      transform: [
        'translate(0, 0)',
	`translate(
           ${$(target).offset().left - $(element).offset().left}px,
	   ${$(target).offset().top - $(element).offset().top}px
	)`
      ]
    }, timeout.value);

    setTimeout(() => {
      //Replace target value with element value
      $(target).html($(element).html());
      //Hide animated element
      $(element).css('opacity', '0');
      //Confirm ordered index
      $(target).css('background', '#21db37');
      resolve();
    }, timeout.value)
  });

}

async function merge(arr1, arr2, target) {
  let i1 = 0, i2 = 0; i3 = 0;
  while(i1 < arr1.childNodes.length && i2 < arr2.childNodes.length) {
    let value1 = parseInt($(arr1.childNodes[i1]).text());
    let value2 = parseInt($(arr2.childNodes[i2]).text());

    if(value1 < value2) {
      await animateMergeAlgorithmPlacement(
        arr1.childNodes[i1++], target.childNodes[i3++]
      );
    }else {
      await animateMergeAlgorithmPlacement(
     	arr2.childNodes[i2++], target.childNodes[i3++]
      );
    }
  }
  while(i1 < arr1.childNodes.length) {
    await animateMergeAlgorithmPlacement(
      arr1.childNodes[i1++], target.childNodes[i3++]
    );
  }
  while(i2 < arr2.childNodes.length) {
    await animateMergeAlgorithmPlacement(
      arr2.childNodes[i2++], target.childNodes[i3++]
    );
  }
}

async function sort(arr) {
  if(arr.childNodes.length <= 1) 
    return

  let middle = Math.floor(arr.childNodes.length / 2);
  let half1 = createSubArray(arr, 0, middle);
  let half2 = createSubArray(arr, middle, arr.childNodes.length);

  $('section.animation-zone').append(half1);
  $(half1).css({
    'left': `${$(arr).position().left - sideMargin}px`,
    'top': `${$(arr).position().top + $(arr).height() + topMargin}px`
  });
  await animateDivision(half1, '+', topMargin);
  
  //Append and animate half2
  $('section.animation-zone').append(half2);
  $(half2).css({
    'left': `${$(half1).position().left + $(half1).width() + sideMargin * 2}px`,
    'top': `${$(half1).position().top}px`
  });
  await animateDivision(half2, '-', topMargin);

  //sort resulting halves recursively
  await sort(half1);
  await sort(half2);

  //merge sorted halves
  await merge(half1, half2, arr);
}
