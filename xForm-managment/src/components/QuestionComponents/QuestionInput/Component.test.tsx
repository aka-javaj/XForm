import React from 'react'
import { render, screen } from '@testing-library/react'

import Component from './Component'

test('默认属性', () => {
  render(<Component />)

  const p = screen.getByText('Input field title')
  expect(p).toBeInTheDocument()

  const input = screen.getByPlaceholderText('Please enter ...')
  expect(input).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component title="hello" placeholder="world" />)

  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  const input = screen.getByPlaceholderText('world')
  expect(input).toBeInTheDocument()
})
