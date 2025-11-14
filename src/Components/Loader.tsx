import { LoadingOverlay } from "@mantine/core";

export const Loader = ({ isLoading }: any) => {
  return (
    <LoadingOverlay
      visible={isLoading}
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 2 }}
      loaderProps={{ color: "cyan.4", type: "bars" }}
    />
  );
};
