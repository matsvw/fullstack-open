import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

vi.mock('../services/blogs') // Mock the blog service

beforeAll(() => {
  vi.spyOn(window, 'confirm').mockImplementation(() => true) // Mock window.confirm to always return true
})

describe('<Blog />', () => {

  test('<renders content>', async () => {
    const blog = {
      title: 'Test blog title',
      author: 'Test blog author',
      url: 'http://testurl.com',
      likes: 5,
      user: {
        name: 'Test User',
        username: 'testuser'
      }
    }

    const mockRemovedHandler = vi.fn()

    const blogUser = {
      name: 'Test User',
      username: 'testuser'
    }

    const user = userEvent.setup()

    render(<Blog blog={blog} user={blogUser} handleBlogRemoved={mockRemovedHandler} />)
    // user this to dump the rendered HTML to the console
    screen.debug()

    screen.getByText('Test blog title')
    const authorElement = screen.queryByText('Test blog author')
    const urlElement = screen.queryByText('http://testurl.com')

    expect(!authorElement,'author should not be visible').toBe(true)
    expect(!urlElement,'url should not be visible').toBe(true)

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    screen.getByText('Test blog author')
    screen.getByText('http://testurl.com')

    const removeButton = screen.getByText('remove')
    screen.debug(removeButton)

    await user.click(removeButton)

    expect(mockRemovedHandler.mock.calls).toHaveLength(1)

  })

})