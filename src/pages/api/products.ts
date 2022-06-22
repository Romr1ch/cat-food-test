import type { NextApiRequest, NextApiResponse } from 'next'

const products = {
  items: [
    {
      id: 'foie-gras',
      descriptionText: {
        default: 'Сказочное заморское яство',
        selected: 'Котэ не одобряет?',
      },
      title: 'Нямушка',
      feature: 'с фуа-гра',
      list: ['10 порций', 'мышь в подарок'],
      img: {
        src: '/images/product-card-cat.png',
        alt: 'Котэ',
      },
      amount: '0,5',
      unit: 'кг',
      footerText: {
        selected: 'Головы щучьи с чесноком да свежайшая сёмгушка.',
        disabled: 'Печалька, с рыбой закончился.',
      },
    },
    {
      id: 'fish',
      descriptionText: {
        default: 'Сказочное заморское яство',
        selected: 'Котэ не одобряет?',
      },
      title: 'Нямушка',
      feature: 'с рыбой',
      list: ['40 порций', '2 мыши в подарок'],
      img: {
        src: '/images/product-card-cat.png',
        alt: 'Котэ',
      },
      amount: '2',
      unit: 'кг',
      footerText: {
        selected: 'Печень утки разварная с артишоками.',
        disabled: 'Печалька, с фуа-гра закончился.',
      },
    },
    {
      id: 'chicken',
      descriptionText: {
        default: 'Сказочное заморское яство',
        selected: 'Котэ не одобряет?',
      },
      title: 'Нямушка',
      feature: 'с рыбой',
      list: ['100 порций', '5 мышей в подарок', 'заказчик доволен'],
      img: {
        src: '/images/product-card-cat.png',
        alt: 'Котэ',
      },
      amount: '5',
      unit: 'кг',
      footerText: {
        selected: 'Филе из цыплят с трюфелями в бульоне.',
        disabled: 'Печалька, с курой закончился.',
      },
    },
  ],
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(products)
  } else {
    res.status(403).json({ message: 'Метод не разрешён.' })
  }
}
