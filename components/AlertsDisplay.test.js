import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import AlertsDisplay from './AlertsDisplay'

describe('Alerts Display Component', () => {
  const alerts = [
    {
      id: '0',
      text: 'Please upgrade your CLI client by running npm update c0d3.',
      type: 'urgent'
    },
    {
      id: '1',
      text: 'Set up your computer to submit challenges.',
      type: 'info',
      url:
        'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
      urlCaption: 'View Instructions'
    }
  ]

  test('Should dismiss alerts based on local storage', () => {
    jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValueOnce(JSON.stringify({ 1: true }))
    const { getAllByRole } = render(
      <AlertsDisplay alerts={alerts} page="curriculum" />
    )
    act(() => {
      const displayedAlerts = getAllByRole('alert')
      expect(displayedAlerts.length).toEqual(1)
    })
  })

  test('Should dismiss alert for curriculum page', () => {
    const { getAllByRole } = render(
      <AlertsDisplay alerts={alerts} page="curriculum" />
    )
    let displayedAlerts = getAllByRole('alert')
    expect(displayedAlerts.length).toEqual(2)
    const firstDismiss = getAllByRole('dismiss')[0]
    act(() => {
      fireEvent.click(firstDismiss)
    })
    displayedAlerts = getAllByRole('alert')
    expect(displayedAlerts.length).toEqual(1)
  })
})
