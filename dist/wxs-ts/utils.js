import bem from './bem';
import memoize from './memoize';
function isSrc(url) {
    return url.indexOf('http') === 0 || url.indexOf('data:image') === 0 || url.indexOf('//') === 0;
}
export default {
    bem: bem,
    isSrc: isSrc,
    memoize: memoize
};
