"use client";

import { DeleteRounded, EditRounded } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { RelativeDate } from "~/components/RelativeDate";
import {
  useCompletion,
  type Completion,
  type Completions,
} from "~/hooks/completions";

type CompletionsTimelineItemProps = {
  completion: Completion;
};

function CompletionsTimelineItem(props: CompletionsTimelineItemProps) {
  const {
    completion,
    isEditing,
    onEdit,
    onCancelEdit,
    onDelete,
    openDeleteConfirm,
    onOpenDeleteConfirm,
    onCloseDeleteConfirm,
  } = useCompletion(props.completion);

  return (
    <TimelineItem key={completion.id}>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector sx={{ opacity: 0.3 }} />
      </TimelineSeparator>
      <TimelineContent sx={{ pb: 3, pr: 0 }}>
        <Box onClick={isEditing ? onCancelEdit : onEdit}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              <RelativeDate date={completion.completedAt} />
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={(theme) => ({
                  color: theme.vars.palette.text.secondary,
                  fontSize: theme.typography.body2.fontSize,
                })}
              >
                {/* 時刻まで表示する */}
                {format(completion.completedAt, "yyyy-MM-dd (eee) HH:mm", {
                  locale: ja,
                })}
              </Typography>
            </Box>
          </Box>
          {completion.activity.name}
        </Box>

        <Collapse in={isEditing}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={onCancelEdit}
              sx={{ py: 1, flexShrink: 1 }}
              color="inherit"
            >
              <EditRounded />
            </Button>

            <Button
              onClick={onOpenDeleteConfirm}
              color="warning"
              sx={{ py: 1, flexShrink: 1 }}
            >
              <DeleteRounded />
            </Button>
          </Box>

          <Dialog
            open={openDeleteConfirm}
            onClose={onCloseDeleteConfirm}
            aria-labelledby="confirmation-to-delete-completion"
            aria-describedby="confirmation-describe-to-delete-completion"
          >
            <Box sx={{ p: 4 }}>
              <DialogTitle
                id="confirmation-to-delete-completion"
                sx={{ px: 0, pt: 0 }}
              >
                本当に削除しますか？
              </DialogTitle>
              <DialogContent sx={{ px: 0 }}>
                <DialogContentText id="confirmation-describe-to-delete-completion">
                  この操作は取り消せません。
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ px: 0, pb: 0 }}>
                <Button
                  onClick={onCloseDeleteConfirm}
                  color="inherit"
                  autoFocus
                >
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
            </Box>
          </Dialog>
        </Collapse>
      </TimelineContent>
    </TimelineItem>
  );
}

type CompletionsTimelineProps = {
  completions: Completions;
};

export function CompletionsTimeline({ completions }: CompletionsTimelineProps) {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {completions.map((completion) => (
        <CompletionsTimelineItem key={completion.id} completion={completion} />
      ))}
    </Timeline>
  );
}
