/**
 * Async iterator over paginated results.
 * @param {function} fn     Bound AWS function which returns paginated results
 * @param {string} key      Response result key
 * @param {object} params   Params to pass to function each page
 * @yields {object}
 */
async function* paginate(fn, key, params={}) {
  let paging = {};

  do {
    const opts = {...params, ...paging};
    const page = await fn(opts).promise();
    const {[key]: results} = page;

    yield* results;

    paging = next(page);
  } while (paging);
}

module.exports = paginate;

/**
 * Extract pagination data from results.
 * @param {object} page
 * @returns {object}
 */
function next(page) {
  const keys = Object.keys(page).filter(key => /^Next[A-Z]/.test(key));

  return keys.reduce((opts, key) => {
    const startKey = key.replace("Next", "Start");
    return {...(opts||{}), ...{[startKey]: page[key]}};
  }, undefined);
}
