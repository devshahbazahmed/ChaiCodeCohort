import { corsair } from './corsair.ts';

corsair.github.api.repositories
  .star({
    owner: 'corsairdev',
    repo: 'corsair',
  })
  .then((res) => console.log(res));
