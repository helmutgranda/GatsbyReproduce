/*
 * Package Import
 */
import Octokit from '@octokit/rest';
/*
 * Local Import
 */
import config from '../../config';

/*
 * Code
 */
// const logErr = (msg) => console.error(msg);

// Configuration Github API
const githubApi = new Octokit({
  headers: {
    'user-agent': 'deviensdev-app',
  },
});

/**
 * Get data from Github
 * @param  {String} username
 * @return {Object}
 */
const getContributorFromGithub = username => {
  // githubApi.authenticate({
  //   type: 'oauth',
  //   token: config.GITHUB_TOKEN, // @TODO
  // });

  return githubApi.users.getForUser({ username }).then(({ data: user }) => ({
    // Data available : https://developer.github.com/v3/users/
    avatar: user.avatar_url,
    name: user.name,
    url: user.blog,
  }));
};

export const getContributor = username => {
  let result = {};

  // Get data from base `xxx.json`
  // eslint-disable-next-line
  const contributor = require(`../../content/authors/${username}`);

  // Get data from Github
  const contributorGithub = getContributorFromGithub(username);

  result = {
    name: username,
    avatar: 'default_avatar',
    ...contributor,
    ...contributorGithub,
  };

  console.log({ result });

  return result;
};
