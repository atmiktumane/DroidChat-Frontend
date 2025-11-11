import { notifications } from "@mantine/notifications";

const successNotification = (title: string, message: string) => {
  notifications.show({
    title: title,
    message: message,
    color: "cyan.5",
    withBorder: true,
    withCloseButton: true,
    className: "!border-cyan-500",
  });
};

const errorNotification = (title: string, message: string) => {
  notifications.show({
    title: title,
    message: message,
    color: "red.9",
    withBorder: true,
    withCloseButton: true,
    className: "!border-red-500",
  });
};

export { successNotification, errorNotification };
