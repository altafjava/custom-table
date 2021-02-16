const prods = []
for (let i = 1; i <= 100; i++) {
  const product = {
    // id: Math.floor(Math.random() * 999) + 100,
    id: i,
    name: Math.random().toString(36).substring(2).replace(/[0-9]/g, ''),
    price: Math.floor(Math.random() * 5000) + 1000,
    quantity: Math.floor(Math.random() * 20) + 1,
  }
  prods.push(product)
}
// console.log(JSON.stringify(prods))
// export default prods
// export default []
export default [
  { id: 1, name: 'clwrj', price: 3222, quantity: 10 },
  { id: 2, name: 'tosved', price: 5231, quantity: 4 },
  { id: 3, name: 'lymcawiqb', price: 4706, quantity: 1 },
  { id: 4, name: 'jkmwalnv', price: 4964, quantity: 15 },
  { id: 5, name: 'vxtynaynmu', price: 3503, quantity: 20 },
  { id: 6, name: 'mwrnl', price: 3800, quantity: 20 },
  { id: 7, name: 'cxbolqn', price: 5962, quantity: 6 },
  { id: 8, name: 'vynbpxs', price: 3563, quantity: 4 },
  { id: 9, name: 'ukubodq', price: 5728, quantity: 2 },
  { id: 10, name: 'qpwh', price: 2033, quantity: 14 },
  { id: 11, name: 'xbiyjxl', price: 5676, quantity: 3 },
  { id: 12, name: 'cbuocegpw', price: 2258, quantity: 10 },
  { id: 13, name: 'xgnvzbwch', price: 3429, quantity: 3 },
  { id: 14, name: 'arqikjlmj', price: 1609, quantity: 10 },
  { id: 15, name: 'ijcsjcz', price: 3922, quantity: 7 },
  { id: 16, name: 'rtxidilei', price: 3399, quantity: 4 },
  { id: 17, name: 'rtpwrfzomq', price: 1140, quantity: 4 },
  { id: 18, name: 'lymzuwfwf', price: 5289, quantity: 10 },
  { id: 19, name: 'hcnllypxi', price: 3890, quantity: 18 },
  { id: 20, name: 'lnufaeg', price: 3725, quantity: 10 },
  { id: 21, name: 'ndeaebp', price: 4111, quantity: 15 },
  { id: 22, name: 'aycieopa', price: 4413, quantity: 12 },
  { id: 23, name: 'qfcedyak', price: 5843, quantity: 19 },
  { id: 24, name: 'brvrqua', price: 3438, quantity: 2 },
  { id: 25, name: 'aehfnriu', price: 1827, quantity: 15 },
  { id: 26, name: 'epolabzxd', price: 3490, quantity: 6 },
  { id: 27, name: 'ycwtls', price: 5791, quantity: 4 },
  { id: 28, name: 'ohqtoxm', price: 1901, quantity: 14 },
  { id: 29, name: 'evxsegio', price: 4432, quantity: 3 },
  { id: 30, name: 'byrcjuavp', price: 4419, quantity: 6 },
]
