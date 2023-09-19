import nodeGeoCoder from 'node-geocoder';

const options = {
    provider : 'mapquest',
    httpAdapter : 'https',
    apiKey : 'KBSLaNyJ1XOQP9QpZdiFOzKXou5wUYdL',
    formatter : null
}

const geoCoder = nodeGeoCoder(options);

export default geoCoder;