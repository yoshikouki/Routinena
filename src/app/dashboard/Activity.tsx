"use client";

import {
  CheckRounded,
  Close,
  DeleteRounded,
  EditRounded,
  SyncRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useActivity, type ActivityModel } from "~/hooks/activities";
import { useBottomFab } from "~/hooks/bottom-fab";
import { CompletionsTimeline } from "../completions/CompletionsTimeline";

export default function Activity(props: { activity: ActivityModel }) {
  const { activity, onDelete, onComplete, isCompleting, isCompleted } =
    useActivity({
      activity: props.activity,
    });
  useBottomFab({
    icon: Close,
    props: {
      onClick: activity.onCancelShow,
      color: "secondary",
    },
  });

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const onOpenDeleteConfirm = () => setOpenDeleteConfirm(true);
  const onCloseDeleteConfirm = () => setOpenDeleteConfirm(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pb: 40,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <Typography variant="h1">{activity.name}</Typography>

        <Typography variant="body1" sx={{ mt: 4 }}>
          {activity.description}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h2">履歴</Typography>

          {activity.completions.length === 0 && (
            <Typography variant="body1">履歴がありません</Typography>
          )}

          <CompletionsTimeline completions={activity.completions} />
        </Box>
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
          onClick={onComplete}
          startIcon={isCompleting ? <SyncRounded /> : <CheckRounded />}
          color={isCompleted ? "success" : "primary"}
          variant="contained"
          sx={{ px: "auto", flexGrow: 1 }}
        >
          {activity.completions.length}
        </Button>

        <Button
          onClick={activity.onEdit}
          sx={{ flexShrink: 1 }}
          color="inherit"
        >
          <EditRounded />
        </Button>

        <Button
          onClick={onOpenDeleteConfirm}
          color="warning"
          sx={{ flexShrink: 1 }}
        >
          <DeleteRounded />
        </Button>

        <Dialog
          open={openDeleteConfirm}
          onClose={onCloseDeleteConfirm}
          aria-labelledby="confirmation-to-delete-activity"
          aria-describedby="confirmation-describe-to-delete-activity"
        >
          <DialogTitle id="confirmation-to-delete-activity">
            本当に削除しますか？
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmation-describe-to-delete-activity">
              これまでの活動履歴も削除されます。 この操作は取り消せません。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseDeleteConfirm} color="inherit" autoFocus>
              戻る
            </Button>
            <Button
              onClick={onDelete}
              startIcon={<DeleteRounded />}
              color="warning"
              variant="contained"
            >
              削除する
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
