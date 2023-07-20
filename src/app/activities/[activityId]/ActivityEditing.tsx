"use client";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { type Activity } from "@prisma/client";

import { Controller } from "react-hook-form";
import { useActivityForm } from "~/hooks/activity-form";

type ActivityEditingProps = {
  activity: Activity;
  onActivityUpdate: () => void;
  onCancel: () => void;
};
export default function ActivityEditing({
  activity,
  onActivityUpdate,
  onCancel,
}: ActivityEditingProps) {
  const { control, onSubmit } = useActivityForm({
    activity,
    onSubmit: onActivityUpdate,
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        mt: 10,
        padding: 0,
        gap: 4,
      }}
    >
      <Box>
        <Typography
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: 30,
          }}
        >
          活動の作成
        </Typography>
      </Box>

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

        <Box sx={{ mt: 6 }}>
          <Button type="submit" color="primary" variant="contained" fullWidth>
            保存
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button onClick={onCancel} color="inherit" variant="text" fullWidth>
            キャンセル
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
