import { Button, Modal, TextInput } from "@mantine/core";
import { MdOutlineAlternateEmail } from "react-icons/md";

export const ForgotPassword = (props: any) => {
  return (
    <>
      <Modal
        opened={props.opened}
        onClose={props.close}
        title="Change Password"
      >
        <div className="flex flex-col gap-5">
          {/* Email Input */}

          <TextInput
            size="sm"
            leftSection={<MdOutlineAlternateEmail />}
            withAsterisk
            label="Email"
            placeholder="Enter email"
            name="email"
            rightSection={
              <Button
                size="xs"
                autoContrast
                variant="filled"
                color="cyan.3"
                styles={{
                  label: { color: "white" },
                }}
                className="mr-1"
              >
                Send OTP
              </Button>
            }
            rightSectionWidth="xl"
          />
        </div>
      </Modal>
    </>
  );
};
