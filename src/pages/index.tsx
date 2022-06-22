import React from 'react'
import styled from 'styled-components'
import { Section } from 'src/components/section'
import { ProductCard } from 'src/components/product-card'

// Progressive Enhancement App

interface ProductItem {
  id: string
  descriptionText: {
    default: string
    selected: string
  }
  title: string
  feature: string
  list: string[]
  img: {
    src: string
    alt: string
  }
  amount: string
  unit: string
  footerText: {
    selected: string
    disabled: string
  }
}

interface Products {
  items: ProductItem[]
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}/api/products`)

  if (!response.ok) {
    return {
      props: {},
    }
  }

  const products = await response.json()

  return {
    props: {
      products,
    },
  }
}

interface HomeProps {
  products?: Products
}

export default function Home({ products }: HomeProps) {
  const [selectedItemIds, setSelectedItemIds] = React.useState<ProductItem['id'][]>([])
  const [disabledItemIds] = React.useState<ProductItem['id'][]>([products.items[2].id])

  const onSelectedClick = (id: ProductItem['id']) => () => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter((selectedId) => selectedId !== id))
    } else {
      setSelectedItemIds([...selectedItemIds, id])
    }
  }

  const productElements = products?.items.map(
    ({ id, descriptionText, title, feature, img, unit, amount, list, footerText }) => (
      <StyledProductCard
        key={id}
        descriptionText={descriptionText}
        title={title}
        feature={feature}
        list={list}
        img={img}
        amount={amount}
        unit={unit}
        footer={{
          text: {
            default: 'Чего сидишь? Порадуй котэ,',
            ...footerText,
          },
          link: {
            href: '#',
            text: 'купи',
          },
        }}
        onSelectedClick={onSelectedClick(id)}
        disabled={disabledItemIds.includes(id)}
        selected={selectedItemIds.includes(id)}
      />
    )
  )

  return (
    <Root>
      <Section title='Ты сегодня покормил кота?'>
        <ProductCards>{productElements}</ProductCards>
      </Section>
    </Root>
  )
}

const Root = styled.main`
  display: flex;
  align-items: center;
  position: relative;
  min-height: 100%;
  min-width: 100%;
  background: #000 url('/background.png');
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 5e-5) 49.88%,
      rgba(0, 0, 0, 0.5) 100%
    );
    z-index: -1;
  }
`

const ProductCards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: -26px 0;
`

const StyledProductCard = styled(ProductCard)`
  margin: 26px 40px;
`
