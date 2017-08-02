const tape = require('tape');


tape('initialising tape', (t) => {
  t.equals(1, 2, '1 should equal 1');
  t.end();
});
