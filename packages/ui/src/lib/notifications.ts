import { notifications as MantineNotifications } from '@mantine/notifications'

export const notifications = {
  error: ({ message, title = 'Something went wrong!' }) => {
    console.error(message)
    MantineNotifications.show({
      title,
      message,
      color: 'red',
    })
  },
  info: ({ message, title = 'Info' }) => {
    console.log(message)
    MantineNotifications.show({
      title,
      message,
    })
  },
  success: ({ message, title = 'Success!' }) => {
    console.log(message)
    MantineNotifications.show({
      title,
      message,
      color: 'green',
    })
  },
  warning: ({ message, title = 'Be Aware!' }) => {
    console.warn(message)
    MantineNotifications.show({
      title,
      message,
      color: 'yellow',
    })
  },
}
