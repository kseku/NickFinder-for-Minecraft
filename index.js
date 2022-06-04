import req from 'request';
import fs from 'fs';

const red = '\x1b[31m';

console.log(
  red +
    `
            _            __      ____    _                __              
   ____    (_)  _____   / /__   / __/   (_)   ____   ____/ /  ___    _____
  / __ \\  / /  / ___/  / //_/  / /_    / /   / __ \\ / __  /  / _ \\  / ___/
 / / / / / /  / /__   / ,<    / __/   / /   / / / // /_/ /  /  __/ / /    
/_/ /_/ /_/   \\___/  /_/|_|  /_/     /_/   /_/ /_/ \\__,_/   \\___/ /_/     
`
);

console.log('for Minecraft\n');

const checkUsernameAvaibility = username => {
  return new Promise(resolve => {
    req.get('https://api.mojang.com/users/profiles/minecraft/' + username, (_, res) => {
      if (res.statusCode === 204) resolve(true);
      else resolve(false);
    });
  });
};

let usernames;

fs.readFile('usernames.txt', 'utf8', (err, data) => {
  if (err) throw err;
  usernames = data.split('\n');
});

const interval = JSON.parse(fs.readFileSync('./config.json')).intervalInMs;

setInterval(() => {
  usernames.forEach(async username => {
    const avaibility = await checkUsernameAvaibility(username);

    const green = '\x1b[32m';

    if (avaibility) console.log(green + 'AVAIBLE! ' + username);
    else console.log(red + 'UNAVAIBLE ' + username);
  });

  console.log(''); // break for readability
}, interval);

const gray = '\x1b[90m';

console.log(gray + 'Started searching!');
