import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

vi.mock('../services/blogs') // Mock the blog service

beforeAll(() => {
  vi.spyOn(window, 'confirm').mockImplementation(() => true) // Mock window.confirm to always return true
})

describe('<BlogForm />', () => {

  test('renders content', async () => {

    const mockCreatedHandler = vi.fn()
    const mockTimeoutMessage = vi.fn()

    const blogUser = {
      name: 'Test User',
      username: 'testuser'
    }

    const user = userEvent.setup()

    render(<BlogForm user={blogUser} handleBlogCreated={mockCreatedHandler} setTimeoutMessage={mockTimeoutMessage} />)
    // user this to dump the rendered HTML to the console
    screen.debug()


    const titleInput = screen.getByLabelText(/title/i)
    const authorInput = screen.getByLabelText(/author/i)
    const urlInput = screen.getByLabelText(/url/i)

    await user.type(titleInput, 'Blog title')
    await user.type(authorInput, 'Blog author')
    await user.type(urlInput, 'http://blogurl.com')

    const sendButton = screen.getByText('create')

    await user.click(sendButton)

    expect(mockTimeoutMessage.mock.calls).toHaveLength(0) //successful creation should not trigger message

    expect(mockCreatedHandler.mock.calls).toHaveLength(1)
    expect(mockCreatedHandler.mock.calls[0][0].title).toBe('Blog title')
    expect(mockCreatedHandler.mock.calls[0][0].author).toBe('Blog author')
    expect(mockCreatedHandler.mock.calls[0][0].url).toBe('http://blogurl.com')

  })

})