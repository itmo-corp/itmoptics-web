export default n => (n >= 1000 ? `${Math.ceil(n / 100) / 10}k`.replace('.', ',') : n);
