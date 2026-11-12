import { notifications as MantineNotifications } from '@mantine/notifications'

type NotificationOptions = {
  message: string
  title?: string
}

export const notifications = {
  error: ({ message, title = 'Something went wrong!' }: NotificationOptions) => {
    console.error(message)
    MantineNotifications.show({
      title,
      message,
      color: 'red',
    })
  },
  info: ({ message, title = 'Info' }: NotificationOptions) => {
    console.log(message)
    MantineNotifications.show({
      title,
      message,
    })
  },
  success: ({ message, title = 'Success!' }: NotificationOptions) => {
    console.log(message)
    MantineNotifications.show({
      title,
      message,
      color: 'green',
    })
  },
  warning: ({ message, title = 'Be Aware!' }: NotificationOptions) => {
    console.warn(message)
    MantineNotifications.show({
      title,
      message,
      color: 'yellow',
    })
  },
}
