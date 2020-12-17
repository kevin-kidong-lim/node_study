const util = require('util');

const dontUseMe = ( (x,y) => {
    console.log(x+y);
})

dontUseMe(1,2);

const dontUseMe2 = util.deprecate( (x,y) => {
    console.log(x+y);
}, ' dontUseMe2는 사용하지 아세요'
);


dontUseMe2(21,2);