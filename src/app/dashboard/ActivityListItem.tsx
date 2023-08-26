"use client";

import { CheckRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Zoom,
} from "@mui/material";
import { RelativeDate } from "~/components/RelativeDate";
import { useActivity, type ActivityModel } from "~/hooks/activities";

interface ActivityListItemProps {
  activity: ActivityModel;
}

export default function ActivityListItem(props: ActivityListItemProps) {
  const {
    activity,
    onComplete,
    isCompleting,
    isCompleted,
    latestCompletion,
    completions,
  } = useActivity({
    activity: props.activity,
  });

  return (
    <Card
      sx={(theme) => ({
        mb: 2,
        background: theme.vars.palette.background.default,
      })}
      elevation={0}
    >
      <CardActionArea onClick={() => props.activity.onShow()}>
        <CardContent sx={{ pb: 2 }}>
          <Box
            component={Typography}
            variant="h3"
            sx={{ fontWeight: 900, fontSize: "1.1rem" }}
          >
            {activity.name}
          </Box>
          {activity.description && (
            <Typography
              variant="body1"
              sx={(theme) => ({
                mt: 0.5,
                color: theme.vars.palette.text.secondary,
              })}
            >
              {activity.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{
          display: "flex",
          gap: 2,
          py: 0,
          px: 2,
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Zoom in={true}>
          <LoadingButton
            variant={isCompleted ? "contained" : "outlined"}
            sx={{ py: 1 }}
            startIcon={<CheckRounded fontSize="large" />}
            onClick={onComplete}
            loading={isCompleting}
            color={isCompleted ? "success" : "primary"}
          >
            {completions.length}
          </LoadingButton>
        </Zoom>
        <RelativeDate
          date={latestCompletion?.completedAt}
          iconVariant="body1"
          variant="body2"
        />
      </CardActions>
    </Card>
  );
}
