"use client";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useActivityForm } from "~/hooks/activity-form";

export default function NewActivity() {
  const { control, onSubmit } = useActivityForm();

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
          新規の活動
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
                margin="normal"
                label="活動名"
                variant="standard"
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
                variant="standard"
                margin="normal"
                label="詳細"
                multiline
                minRows={3}
                fullWidth
              />
            )}
          />
        </Box>

        <Box sx={{ mt: 6 }}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
          >
            保存
          </Button>
        </Box>

      </Box>
    </Container>
  );
}