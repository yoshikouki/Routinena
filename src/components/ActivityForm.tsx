"use client";

import { ArrowBackIosRounded, BookmarkRounded } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useActivityForm, type UseActivityForm } from "~/hooks/activity-form";

type ActivityFormProps = UseActivityForm;

export const ActivityForm = (props: ActivityFormProps) => {
  const { control, onSubmit, onCancel } = useActivityForm(props);

  return (
    <Box
      component="form"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
    >
      <Box sx={{ mt: 4 }}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              label="活動名"
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              label="詳細"
              multiline
              minRows={3}
              fullWidth
            />
          )}
        />
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          mt: 6,
          display: "flex",
          // flexWrap: "nowrap",
          gap: 1,
          mb: 15,
          px: 2,
          width: "100%",
        }}
      >
        <Button
          onClick={onCancel}
          color="inherit"
          variant="text"
          sx={{ flexShrink: 1 }}
        >
          <ArrowBackIosRounded />
        </Button>

        <Button
          type="submit"
          startIcon={<BookmarkRounded />}
          color="primary"
          variant="contained"
          fullWidth
        >
          保存
        </Button>
      </Box>
    </Box>
  );
};
