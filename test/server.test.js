const tape = require('tape');


tape('initialising tape', (t) => {
  t.equals(1, 1, '1 should equal 1');
  t.end();
});
