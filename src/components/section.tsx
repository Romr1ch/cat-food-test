import React from 'react'
import styled from 'styled-components'
import { Container } from 'src/components/container'

interface SectionProps {
  title: React.ReactNode
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <Root>
      <Container>
        <Header>{title}</Header>
      </Container>
      {children}
    </Root>
  )
}

const Root = styled.section`
  width: 100%;
  padding-top: 48px;
  padding-bottom: 48px;
`

const Header = styled.h1`
  text-align: center;
  font-weight: 100;
  font-family: 'Exo 2', sans-serif;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 24px;
`
