import React from 'react'
import NextImage from 'next/image'
import styled from 'styled-components'

interface ProductCardProps {
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
  disabled?: boolean
  selected?: boolean
  footer: {
    text: {
      default: string
      selected: string
      disabled: string
    }
    link: {
      text: string
      href: string
    }
  }
  onSelectedClick?: () => void
  onSelectedMouseOut?: () => void
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(function ProductCard(
  props,
  ref
) {
  const {
    descriptionText,
    title,
    feature,
    list,
    img,
    amount,
    unit,
    disabled = false,
    selected = false,
    footer,
    onSelectedClick,
    onSelectedMouseOut,
    ...rest
  } = props
  const [isHovered, setIsHovered] = React.useState(false)

  const onMouseOut = () => {
    if (selected) {
      setIsHovered(true)
    }
  }

  const onClick = () => {
    if (selected && isHovered) {
      setIsHovered(false)
    }

    onSelectedClick?.()
  }

  const onLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onSelectedClick?.()
  }

  const listElements = list.map((item) => (
    <ListItem key={item} $disabled={disabled}>
      {item}
    </ListItem>
  ))

  return (
    <Root ref={ref} {...rest}>
      <Body
        $disabled={disabled}
        $selected={selected}
        onClick={!disabled ? onClick : undefined}
        onMouseOut={!disabled ? onMouseOut : undefined}
      >
        <Header $disabled={disabled} $selected={selected}>
          <Description $disabled={disabled} $active={isHovered}>
            {selected && isHovered ? descriptionText.selected : descriptionText.default}
          </Description>
        </Header>
        <Content $disabled={disabled} $selected={selected}>
          <Title $disabled={disabled}>
            {title}
            <Feature>{feature}</Feature>
          </Title>
          <List>{listElements}</List>
          <Image $disabled={disabled}>
            <NextImage layout='fill' src={img.src} alt={img.alt} priority />
          </Image>
          <Weight $disabled={disabled} $selected={selected}>
            <Amount>{amount}</Amount>
            <Unit>{unit}</Unit>
          </Weight>
        </Content>
      </Body>
      <Footer>
        {disabled ? (
          <FooterText $disabled={disabled}>{footer.text.disabled}</FooterText>
        ) : selected ? (
          <FooterText>{footer.text.selected}</FooterText>
        ) : (
          <>
            <FooterText>{footer.text.default}</FooterText>{' '}
            <FooterLink href={footer.link.href} onClick={onLinkClick}>
              {footer.link.text}
            </FooterLink>
            .
          </>
        )}
      </Footer>
    </Root>
  )
})

const Root = styled.div``

const Body = styled.div<{ $disabled: boolean; $selected: boolean }>`
  position: relative;
  overflow: hidden;
  width: 320px;
  height: 486px;
  padding-top: 44px;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  user-select: none;
  margin-bottom: 16px;

  &:before {
    content: '';
    position: absolute;
    width: 70px;
    height: 70px;
    top: -36px;
    left: -36px;
    transform: rotate(45deg);
    border-right: 4px solid;
    box-shadow: 0 0 0 50px ${({ theme }) => theme.bg.primary};
    border-color: ${({ $selected, $disabled, theme }) =>
      $disabled ? theme.text.disabled : $selected ? theme.secondary.main : theme.primary.main};
  }

  &:hover:before {
    border-color: ${({ $selected, $disabled, theme }) =>
      !$disabled && ($selected ? theme.secondary.light : theme.primary.light)};
  }
`

const Content = styled.div<{ $disabled?: boolean; $selected: boolean }>`
  position: relative;
  height: 100%;
  border-width: 0 4px 4px 4px;
  border-style: solid;
  border-color: ${({ $selected, $disabled, theme }) =>
    $disabled ? theme.text.disabled : $selected ? theme.secondary.main : theme.primary.main};
  background-color: ${({ theme }) => theme.bg.primary};
  border-radius: 0 0 12px 12px;
  padding: 4px 24px 24px 48px;
  overflow: hidden;

  ${Body}:hover && {
    border-color: ${({ $selected, $disabled, theme }) =>
      !$disabled && ($selected ? theme.secondary.light : theme.primary.light)};
  }
`

const Header = styled.div<{ $disabled?: boolean; $selected: boolean }>`
  position: absolute;
  background-color: ${({ theme }) => theme.bg.primary};
  top: 0;
  left: 44px;
  right: 0;
  height: 44px;
  border-top-right-radius: 12px;
  border-width: 4px 4px 0 0;
  border-style: solid;
  border-color: ${({ $selected, $disabled, theme }) =>
    $disabled ? theme.text.disabled : $selected ? theme.secondary.main : theme.primary.main};
  padding: 18px 24px 0 8px;

  ${Body}:hover && {
    border-color: ${({ $selected, $disabled, theme }) =>
      !$disabled && ($selected ? theme.secondary.light : theme.primary.light)};
  }
`

const Description = styled.p<{ $disabled?: boolean; $active: boolean }>`
  color: ${({ $disabled, $active, theme }) =>
    $disabled ? theme.text.disabled : $active ? theme.secondary.main : theme.text.secondary};
  line-height: 19px;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 6px;
`

const Title = styled.h2<{ $disabled?: boolean }>`
  line-height: 56px;
  font-weight: 700;
  font-size: 48px;
  color: ${({ $disabled, theme }) => ($disabled ? theme.text.disabled : theme.text.primary)};
  margin-bottom: 16px;
`

const Feature = styled.p`
  font-size: 24px;
  line-height: 28px;
`

const List = styled.ul``

const ListItem = styled.li<{ $disabled?: boolean }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${({ $disabled, theme }) => ($disabled ? theme.text.disabled : theme.text.secondary)};
`

const Image = styled.div<{ $disabled?: boolean }>`
  position: absolute;
  left: -30px;
  bottom: -92px;
  width: 368px;
  height: 360px;
  z-index: 1;
  opacity: ${({ $disabled }) => $disabled && 0.5};
`

const Weight = styled.div<{ $disabled?: boolean; $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  width: 80px;
  height: 80px;
  right: 16px;
  bottom: 16px;
  background-color: ${({ $selected, $disabled, theme }) =>
    $disabled ? theme.text.disabled : $selected ? theme.secondary.main : theme.primary.main};
  z-index: 2;
  border-radius: 50%;

  ${Body}:hover && {
    background-color: ${({ $selected, $disabled, theme }) =>
      !$disabled && ($selected ? theme.secondary.light : theme.primary.light)};
  }
`

const Amount = styled.div`
  font-weight: 400;
  font-size: 42px;
  line-height: 36px;
`

const Unit = styled.div`
  font-size: 21px;
  line-height: 22px;
`

const Footer = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  color: ${({ theme }) => theme.primary.main};
`

const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dashed currentColor;
`

const FooterText = styled.span<{ $disabled?: boolean }>`
  color: ${({ $disabled, theme }) => ($disabled ? theme.yellow.main : theme.white.main)};
`
